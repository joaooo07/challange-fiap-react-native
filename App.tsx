import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import PatiosList from './src/screens/PatioList';
import PatioMap from './src/screens/PatioMap';
import FormEntry from './src/screens/FormEntry';
import Preferences from './src/screens/Preferences';

export type RootStackParamList = {
  Home: undefined;
  PatiosList: undefined;
  PatioMap: { patioId: string };
  BikeDetails: { bikeId: string };
  FormEntry: undefined;
  Preferences: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#00A859',
          headerTitle: () => (
            <Image
              source={require('./assets/logo.png')}
              style={{ width: 120, height: 40 }}
              resizeMode="contain"
            />
          ),
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: true }} />
        <Stack.Screen
          name="PatiosList"
          component={PatiosList}
          options={{ title: 'Selecione o Pátio' }}
        />
        <Stack.Screen
          name="PatioMap"
          component={PatioMap}
          options={{ title: 'Mapa do Pátio' }}
        />
        <Stack.Screen
          name="FormEntry"
          component={FormEntry}
          options={{ title: 'Formulário de Entrada' }}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{ title: 'Perfil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}