import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getSlots, saveSlots, Slot as SlotType } from '../storage/storage';

const patios = [
  { id: 'p1', name: 'Pátio Principal' },
  { id: 'p2', name: 'Pátio Secundário' },
  { id: 'p3', name: 'Pátio Coberto' }
];

const patiosData: Record<string, SlotType[]> = {
  p1: [
    { id: 'A1', occupied: true,  brand: 'Honda',  plate: 'ABC-1234', color: 'Vermelho', model: 'CG 160' },
    { id: 'A2', occupied: false },
    { id: 'B1', occupied: true,  brand: 'Yamaha', plate: 'XYZ-5678', color: 'Preto',   model: 'YZF R3' },
    { id: 'B2', occupied: false },
    { id: 'C1', occupied: true,  brand: 'Suzuki', plate: 'JKL-9012', color: 'Azul',    model: 'GSX-S750' },
    { id: 'C2', occupied: false }
  ],
  p2: [
    { id: 'D1', occupied: true,  brand: 'Ducati',   plate: 'DUC-2025', color: 'Branco',   model: 'Panigale V4' },
    { id: 'D2', occupied: false },
    { id: 'E1', occupied: false },
    { id: 'E2', occupied: false }
  ],
  p3: [
    { id: 'G1', occupied: false },
    { id: 'G2', occupied: false },
    { id: 'H1', occupied: true,  brand: 'Triumph',  plate: 'TRI-3333', color: 'Azul',     model: 'Street Triple' },
    { id: 'H2', occupied: false }
  ]
};

type Props = NativeStackScreenProps<RootStackParamList, 'FormEntry'>;

const FormEntry: React.FC<Props> = ({ navigation }) => {
  const [selectedPatio, setSelectedPatio] = useState<string>(patios[0].id);
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<SlotType[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [form, setForm] = useState({ brand: '', plate: '', color: '', model: '' });

  useEffect(() => {
    async function load() {
      const stored = await getSlots(selectedPatio);
      const base = stored ?? patiosData[selectedPatio] ?? [];
      setSlots(base);
      setAvailableSlots(base.filter(s => !s.occupied));
      setSelectedSlotId(null);
      setForm({ brand: '', plate: '', color: '', model: '' });
    }
    load();
  }, [selectedPatio]);

  const handleSave = async () => {
    if (!selectedSlotId) {
      Alert.alert('Selecione uma vaga disponível');
      return;
    }
    if (!form.brand || !form.plate || !form.color || !form.model) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    const updated = slots.map(s =>
      s.id === selectedSlotId ? { ...s, occupied: true, ...form } : s
    );
    setSlots(updated);
    await saveSlots(selectedPatio, updated);
    Alert.alert('Sucesso', 'Vaga cadastrada');
    setAvailableSlots(updated.filter(s => !s.occupied));
    setSelectedSlotId(null);
    setForm({ brand: '', plate: '', color: '', model: '' });
    navigation.navigate('PatioMap', { patioId: selectedPatio });
  };
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Selecione o Pátio:</Text>
        <View style={styles.patioButtons}>
          {patios.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.patioButton, p.id === selectedPatio && styles.patioButtonActive]}
              onPress={() => setSelectedPatio(p.id)}
            >
              <Text style={[styles.patioButtonText, p.id === selectedPatio && styles.patioButtonTextActive]}> {p.name} </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Vagas Disponíveis:</Text>
        <View style={styles.slotsContainer}>
          {availableSlots.map(s => (
            <TouchableOpacity
              key={s.id}
              style={[
                styles.slotButton,
                s.id === selectedSlotId && styles.slotButtonActive
              ]}
              onPress={() =>
                setSelectedSlotId(prev => (prev === s.id ? null : s.id))
              }
            >
              <Text style={styles.slotText}>{s.id}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedSlotId && (
          <>
            <Text style={styles.label}>Marca:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Honda"
              placeholderTextColor="#888"
              value={form.brand}
              onChangeText={text => setForm({ ...form, brand: text })}
            />
            <Text style={styles.label}>Placa:</Text>
            <TextInput
              style={styles.input}
              placeholder="ABC-1234"
              placeholderTextColor="#888"
              value={form.plate}
              onChangeText={text => setForm({ ...form, plate: text })}
            />
            <Text style={styles.label}>Cor:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Vermelho"
              placeholderTextColor="#888"
              value={form.color}
              onChangeText={text => setForm({ ...form, color: text })}
            />
            <Text style={styles.label}>Modelo:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. CG 160"
              placeholderTextColor="#888"
              value={form.model}
              onChangeText={text => setForm({ ...form, model: text })}
            />

            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  container: { padding: 16 },
  label: { color: '#FFF', fontSize: 16, marginVertical: 8 },
  patioButtons: { flexDirection: 'row', marginBottom: 16 },
  patioButton: { backgroundColor: '#222', padding: 10, borderRadius: 6, marginRight: 8 },
  patioButtonActive: { backgroundColor: '#00A859' },
  patioButtonText: { color: '#FFF' },
  patioButtonTextActive: { fontWeight: '600' },
  slotsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  slotButton: {
    width: 60,
    height: 60,
    backgroundColor: '#444',
    margin: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slotButtonActive: { backgroundColor: '#FFD700' },
  slotText: { color: '#FFF', fontWeight: 'bold' },
  input: { backgroundColor: '#333', color: '#FFF', borderRadius: 6, padding: 8, marginTop: 4 },
  saveButton: {
    backgroundColor: '#00A859',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  cancelButton: {
    backgroundColor: '#666',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8
  },
  cancelButtonText: { color: '#FFF', fontSize: 16 }
});

export default FormEntry;
