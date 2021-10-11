import { RouteProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import ReclamoDetalle from '../screens/ReclamoDetalle'
import ReclamoGenerar from '../screens/ReclamoGenerar'
import ReclamoListado from '../screens/ReclamoListado'

const Stack = createStackNavigator()

interface ReclamoStackProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ReclamosStack({
  route,
}: ReclamoStackProps): JSX.Element {
  const { authenticated } = route.params

  return (
    <Stack.Navigator initialRouteName="ReclamoListado">
      <Stack.Screen
        component={ReclamoListado}
        initialParams={{ authenticated }}
        name="ReclamoListado"
        options={{ headerTitle: 'Reclamos' }}
      />
      <Stack.Screen
        component={ReclamoDetalle}
        name="ReclamoDetalle"
        options={{ headerTitle: 'Detalle del Reclamo' }}
      />
      {authenticated && (
        <Stack.Screen
          component={ReclamoGenerar}
          name="ReclamoGenerar"
          options={{ headerTitle: 'Crear Reclamo' }}
        />
      )}
    </Stack.Navigator>
  )
}
