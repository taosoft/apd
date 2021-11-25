import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import { NavigationScreenKey } from '../constants/NavigationKeys'
import FinalizaRegistro from '../screens/FinalizaRegistro'
import Inicio from '../screens/Inicio'
import Login from '../screens/Login'
import NotFoundScreen from '../screens/NotFoundScreen'
import Registrarse from '../screens/Registrarse'
import { RootStackParamList } from '../types'
import AuthenticatedStack from './AuthenticatedStack'
import UnauthenticatedStack from './UnauthenticatedStack'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}): JSX.Element {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const RootStack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={NavigationScreenKey.INICIO}
      screenOptions={headerStyle}
    >
      <RootStack.Screen
        component={Inicio}
        name={NavigationScreenKey.INICIO}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        component={Registrarse}
        name={NavigationScreenKey.REGISTRARSE}
        options={{ headerTitle: 'Registrarse' }}
      />
      <RootStack.Screen
        component={Login}
        name={NavigationScreenKey.LOGIN}
        options={{ headerTitle: 'Inicio de sesión' }}
      />
      <RootStack.Screen
        component={FinalizaRegistro}
        name={NavigationScreenKey.FINALIZA_REGISTRO}
        options={{ headerTitle: 'Finalizar Registro' }}
      />
      <RootStack.Screen
        component={AuthenticatedStack}
        name={NavigationScreenKey.AUTHENTICATED_STACK}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        component={UnauthenticatedStack}
        name={NavigationScreenKey.UNAUTHENTICATED_STACK}
        options={{ headerTitle: 'Servicios y Comercios' }}
      />
      <RootStack.Screen
        component={NotFoundScreen}
        name={NavigationScreenKey.NOT_FOUND}
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
