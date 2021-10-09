/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Login from '../screens/Login';
import Registrarse from '../screens/Registrarse';
import FinalizaRegistro from '../screens/FinalizaRegistro';
import Inicio from '../screens/Inicio';
import BottomTabNavigator from './MyBottomBar';

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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registrarse" component={Registrarse} />
      <Stack.Screen name="FinalizaRegistro" component={FinalizaRegistro} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
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

{/* <TabBienvenidoStack.Screen name="Bienvenido" component={Bienvenido} />
<TabBienvenidoStack.Screen name="Reclamos" component={ReclamoInicio} />
<TabBienvenidoStack.Screen name="Denuncias" component={Denuncia} />
<TabBienvenidoStack.Screen name="Comercios" component={ComercioInicio} />
<TabBienvenidoStack.Screen name="Login" component={Login} />
<TabBienvenidoStack.Screen name="Registrarse" component={Registrarse} />
<TabBienvenidoStack.Screen name="FinalizaRegistro" component={FinalizaRegistro} /> */}