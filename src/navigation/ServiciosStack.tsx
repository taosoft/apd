import { RouteProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import ServicioDetalle from '../screens/ServicioDetalle'
import ServicioGenerar from '../screens/ServicioGenerar'
import ServicioListado from '../screens/ServicioListado'

const Stack = createStackNavigator()

interface ServicioStackProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ServiciosStack({
  route,
}: ServicioStackProps): JSX.Element {
  const { authenticated } = route.params

  return (
    <Stack.Navigator initialRouteName="ServicioListado">
      <Stack.Screen
        component={ServicioListado}
        initialParams={{ authenticated }}
        name="ServicioListado"
        options={{ headerTitle: 'Servicios' }}
      />
      <Stack.Screen
        component={ServicioDetalle}
        name="ServicioDetalle"
        options={{ headerTitle: 'Detalle del Servicio' }}
      />
      {authenticated && (
        <Stack.Screen
          component={ServicioGenerar}
          name="ServicioGenerar"
          options={{ headerTitle: 'Crear un Servicio' }}
        />
      )}
    </Stack.Navigator>
  )
}
