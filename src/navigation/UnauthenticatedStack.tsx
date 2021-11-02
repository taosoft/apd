import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { UnAuthNavigationScreenKey } from '../constants/NavigationKeys'
import Bienvenido from '../screens/Bienvenido'
import ComercioDetalle from '../screens/ComercioDetalle'
import ComercioListado from '../screens/ComercioListado'
import ServicioDetalle from '../screens/ServicioDetalle'
import ServicioListado from '../screens/ServicioListado'

const Stack = createStackNavigator()

export default function UnauthenticatedStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName={UnAuthNavigationScreenKey.BIENVENIDO}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        component={Bienvenido}
        initialParams={{ authenticated: false }}
        name={UnAuthNavigationScreenKey.BIENVENIDO}
        options={{ headerTitle: 'Bienvenido' }}
      />
      <Stack.Screen
        component={ComercioListado}
        initialParams={{ authenticated: false }}
        name={UnAuthNavigationScreenKey.COMERCIO_LISTADO}
        options={{ headerTitle: 'Comercios' }}
      />
      <Stack.Screen
        component={ComercioDetalle}
        name={UnAuthNavigationScreenKey.COMERCIO_DETALLE}
        options={{ headerTitle: 'Detalle del Comercio' }}
      />
      <Stack.Screen
        component={ServicioListado}
        initialParams={{ authenticated: false }}
        name={UnAuthNavigationScreenKey.SERVICIO_LISTADO}
        options={{ headerTitle: 'Servicios' }}
      />
      <Stack.Screen
        component={ServicioDetalle}
        name={UnAuthNavigationScreenKey.SERVICIO_DETALLE}
        options={{ headerTitle: 'Detalle del Servicio' }}
      />
    </Stack.Navigator>
  )
}
