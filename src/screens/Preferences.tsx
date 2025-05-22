import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';



const USER_NAME_KEY = 'prefs_user_name';
const USER_ID_KEY = 'prefs_user_id';
const USER_EMAIL_KEY = 'prefs_user_email';
const USER_ROLE_KEY = 'prefs_user_role';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

const Preferences: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState<string>('João Pedro Motta');
  const [userId, setUserId]     = useState<string>('RM556557');
  const [email, setEmail]       = useState<string>('jpmarcolinix@gmail.com');
  const [role, setRole]         = useState<string>('Administrador');

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem(USER_NAME_KEY);
      const id   = await AsyncStorage.getItem(USER_ID_KEY);
      const mail = await AsyncStorage.getItem(USER_EMAIL_KEY);
      const rl   = await AsyncStorage.getItem(USER_ROLE_KEY);
      if (name) setUserName(name);
      if (id)   setUserId(id);
      if (mail) setEmail(mail);
      if (rl)   setRole(rl);
    })();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Perfil do Usuário</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.profileLabel}>Nome:</Text>
        <Text style={styles.profileValue}>{userName}</Text>

        <Text style={styles.profileLabel}>ID:</Text>
        <Text style={styles.profileValue}>{userId}</Text>

        <Text style={styles.profileLabel}>E-mail:</Text>
        <Text style={styles.profileValue}>{email}</Text>

        <Text style={styles.profileLabel}>Cargo:</Text>
        <Text style={styles.profileValue}>{role}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 16
  },
  header: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  profileContainer: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24
  },
  profileLabel: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 12
  },
  profileValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600'
  },
  backButton: {
    marginTop: 'auto',
    backgroundColor: '#00A859',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center'
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Preferences;
