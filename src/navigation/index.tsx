import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import Inicio from '../screens/Inicio'
import NotFoundScreen from '../screens/NotFoundScreen'
import Registrarse from '../screens/Registrarse'
import { RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import LoginStack from './LoginStack'
import UnauthenticatedStack from './UnauthenticatedStack'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}): JSX.Element {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const RootStack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Inicio" screenOptions={headerStyle}>
      <RootStack.Screen
        component={Inicio}
        name="Inicio"
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        component={Registrarse}
        name="Registrarse"
        options={{ headerTitle: 'Registrarse' }}
      />
      <RootStack.Screen
        component={LoginStack}
        name="LoginStack"
        options={{ headerTitle: 'Inicio de sesión' }}
      />
      <RootStack.Screen
        component={UnauthenticatedStack}
        name="UnauthenticatedStack"
        options={{ headerTitle: 'Servicios y Comercios' }}
      />
      <RootStack.Screen
        component={NotFoundScreen}
        name="NotFound"
        options={{ title: 'Oops!' }}
      />
    </RootStack.Navigator>
  )
}

const headerStyle = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#409DC4',
  },
  headerTintColor: '#FFF',
}
