import { RouteProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import DenunciaDetalle from '../screens/DenunciaDetalle'
import DenunciaGenerar from '../screens/DenunciaGenerar'
import DenunciaListado from '../screens/DenunciaListado'

const Stack = createStackNavigator()

interface DenunciaStackProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function DenunciasStack({
  route,
}: DenunciaStackProps): JSX.Element {
  const { authenticated } = route.params

  return (
    <Stack.Navigator initialRouteName="DenunciaListado">
      <Stack.Screen
        component={DenunciaListado}
        initialParams={{
          authenticated,
        }}
        name="DenunciaListado"
      />
      <Stack.Screen component={DenunciaDetalle} name="DenunciaDetalle" />
      {authenticated && (
        <Stack.Screen component={DenunciaGenerar} name="DenunciaGenerar" />
      )}
    </Stack.Navigator>
  )
}
