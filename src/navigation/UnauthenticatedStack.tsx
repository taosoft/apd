import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Bienvenido from '../screens/Bienvenido'
import ComerciosStack from './ComerciosStack'
import ServiciosStack from './ServiciosStack'

const Stack = createStackNavigator()

export default function UnauthenticatedStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="UnauthenticatedBienvenido"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        component={Bienvenido}
        initialParams={{
          authenticated: false,
        }}
        name="UnauthenticatedBienvenido"
      />
      <Stack.Screen
        component={ComerciosStack}
        initialParams={{
          authenticated: false,
        }}
        name="ComerciosStack"
      />
      <Stack.Screen
        component={ServiciosStack}
        initialParams={{
          authenticated: false,
        }}
        name="ServiciosStack"
      />
    </Stack.Navigator>
  )
}
