import { RouteProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import ComercioDetalle from '../screens/ComercioDetalle'
import ComercioGenerar from '../screens/ComercioGenerar'
import ComercioListado from '../screens/ComercioListado'

const Stack = createStackNavigator()

interface ComercioStackProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ComerciosStack({
  route,
}: ComercioStackProps): JSX.Element {
  const { authenticated } = route.params

  return (
    <Stack.Navigator initialRouteName="ComercioListado">
      <Stack.Screen
        component={ComercioListado}
        initialParams={{
          authenticated,
        }}
        name="ComercioListado"
      />
      <Stack.Screen component={ComercioDetalle} name="ComercioDetalle" />
      {authenticated && (
        <Stack.Screen component={ComercioGenerar} name="ComercioGenerar" />
      )}
    </Stack.Navigator>
  )
}
