import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const patios = [
  { id: 'p1', name: 'Pátio Principal' },
  { id: 'p2', name: 'Pátio Secundário' },
  { id: 'p3', name: 'Pátio Coberto' }
];

type Props = NativeStackScreenProps<RootStackParamList, 'PatiosList'>;

const PatiosList: React.FC<Props> = ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={patios}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('PatioMap', { patioId: item.id })}
        >
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16
  },
  listContent: {
    paddingBottom: 16
  },
  item: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 6,
    marginBottom: 12
  },
  itemText: {
    color: '#FFF',
    fontSize: 16
  }
});

export default PatiosList;
