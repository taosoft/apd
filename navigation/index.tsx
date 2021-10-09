import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Registrarse from '../screens/Registrarse';
import Inicio from '../screens/Inicio';
import LoginStack from './LoginStack';
import UnauthenticatedStack from './UnauthenticatedStack';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={headerStyle}
      initialRouteName="Inicio"
    >
      <RootStack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
      <RootStack.Screen name="Registrarse" component={Registrarse} />
      <RootStack.Screen name="LoginStack" component={LoginStack} />
      <RootStack.Screen name="UnauthenticatedStack" component={UnauthenticatedStack} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </RootStack.Navigator>
  );
}

const headerStyle = {
  headerShown: true,
  headerTintColor: '#FFF',
  headerStyle: {
    backgroundColor: '#409DC4',
  },
};
