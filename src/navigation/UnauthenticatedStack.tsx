import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Bienvenido from '../screens/Bienvenido'
import ComercioDetalle from '../screens/ComercioDetalle'
import ComercioListado from '../screens/ComercioListado'
import ServicioDetalle from '../screens/ServicioDetalle'
import ServicioListado from '../screens/ServicioListado'

const Stack = createStackNavigator()

export default function UnauthenticatedStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="UnauthenticatedBienvenido"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        component={Bienvenido}
        initialParams={{ authenticated: false }}
        name="UnauthenticatedBienvenido"
        options={{ headerTitle: 'Bienvenido' }}
      />
      <Stack.Screen
        component={ComercioListado}
        initialParams={{
          authenticated: false,
        }}
        name="ComercioListado"
      />
      <Stack.Screen component={ComercioDetalle} name="ComercioDetalle" />
      <Stack.Screen
        component={ServicioListado}
        initialParams={{ authenticated: false }}
        name="ServicioListado"
        options={{ headerTitle: 'Servicios' }}
      />
      <Stack.Screen
        component={ServicioDetalle}
        name="ServicioDetalle"
        options={{ headerTitle: 'Detalle del Servicio' }}
      />
    </Stack.Navigator>
  )
}
