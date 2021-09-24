/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import ReclamoInicio from '../screens/ReclamoInicio';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Login from '../screens/Login';
import Registrarse from '../screens/Registrarse';
import FinalizaRegistro from '../screens/FinalizaRegistro';
import Bienvenido from '../screens/Bienvenido';
import Denuncia from '../screens/DenunciaInicio';
import ComercioInicio from '../screens/ComercioInicio';
import Inicio from '../screens/Inicio';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={headerStyle}
      initialRouteName="Inicio"
    >
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
      <Stack.Screen name="Bienvenido" component={Bienvenido} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Reclamos" component={ReclamoInicio} />
      <Stack.Screen name="Denuncias" component={Denuncia} />
      <Stack.Screen name="Comercios" component={ComercioInicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registrarse" component={Registrarse} />
      <Stack.Screen name="FinalizaRegistro" component={FinalizaRegistro} />
    </Stack.Navigator>
  );
}

const headerStyle = {
  headerShown: true,
  headerTintColor: '#FFF',
  headerStyle: {
    backgroundColor: '#409DC4',
  },
};