import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import FinalizaRegistro from '../screens/FinalizaRegistro'
import Login from '../screens/Login'
import AuthenticatedStack from './AuthenticatedStack'

const Stack = createStackNavigator()

export default function LoginStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen
        component={FinalizaRegistro}
        name="FinalizaRegistro"
        options={{ headerTitle: 'Finalizar Registro' }}
      />
      <Stack.Screen component={AuthenticatedStack} name="AuthenticatedStack" />
    </Stack.Navigator>
  )
}
