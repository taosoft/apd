import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import CameraPicker from '../components/Camera'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
import Bienvenido from '../screens/Bienvenido'
import ComercioDetalle from '../screens/ComercioDetalle'
import ComercioGenerar from '../screens/ComercioGenerar'
import ComercioListado from '../screens/ComercioListado'
import DenunciaDetalle from '../screens/DenunciaDetalle'
import DenunciaGenerar from '../screens/DenunciaGenerar'
import DenunciaListado from '../screens/DenunciaListado'
import Notificaciones from '../screens/Notificaciones'
import PerfilUsuario from '../screens/PerfilUsuario'
import ReclamoDetalle from '../screens/ReclamoDetalle'
import ReclamoGenerar from '../screens/ReclamoGenerar'
import ReclamoListado from '../screens/ReclamoListado'
import ServicioDetalle from '../screens/ServicioDetalle'
import ServicioGenerar from '../screens/ServicioGenerar'
import ServicioListado from '../screens/ServicioListado'
import {
  BottomTabParamList,
  TabInicioParamList,
  TabNotificacionesParamList,
  TabPerfilParamList,
} from '../types'
import { TabBarIcon } from './helpers'

const TabStack = createBottomTabNavigator<BottomTabParamList>()

export default function AuthenticatedStack(): JSX.Element {
  return (
    <TabStack.Navigator
      backBehavior="initialRoute" // TODO: Check?
      initialRouteName={AuthNavigationScreenKey.INICIO}
      tabBarOptions={{ activeTintColor: '#409DC4' }}
    >
      <TabStack.Screen
        component={TabPerfilNavigator}
        name={AuthNavigationScreenKey.PERFIL}
        options={{
          tabBarIcon: () => TabBarIcon({ color: '#409DC4', name: 'user' }),
        }}
      />
      <TabStack.Screen
        component={TabInicioNavigator}
        name={AuthNavigationScreenKey.INICIO}
        options={{
          tabBarIcon: () => TabBarIcon({ color: '#409DC4', name: 'home' }),
        }}
      />
      <TabStack.Screen
        component={TabNotificacionNavigator}
        name={AuthNavigationScreenKey.NOTIFICACIONES}
        options={{
          tabBarIcon: () =>
            TabBarIcon({ color: '#409DC4', name: 'notification' }),
        }}
      />
    </TabStack.Navigator>
  )
}

const TabPerfilStack = createStackNavigator<TabPerfilParamList>()

function TabPerfilNavigator() {
  return (
    <TabPerfilStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#409DC4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <TabPerfilStack.Screen
        component={PerfilUsuario}
        name="TabPerfilScreen"
        options={{ headerShown: false, headerTitle: 'Perfil' }}
      />
    </TabPerfilStack.Navigator>
  )
}

const TabInicioStack = createStackNavigator<TabInicioParamList>()

function TabInicioNavigator() {
  return (
    <TabInicioStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#409DC4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <TabInicioStack.Screen
        component={Bienvenido}
        initialParams={{ authenticated: true }}
        name={AuthNavigationScreenKey.BIENVENIDO}
        options={{ title: '' }}
      />
      <TabInicioStack.Screen
        component={ComercioListado}
        initialParams={{
          authenticated: true,
        }}
        name={AuthNavigationScreenKey.COMERCIOLISTADO}
        options={{ headerTitle: 'Comercios' }}
      />
      <TabInicioStack.Screen
        component={ComercioDetalle}
        name={AuthNavigationScreenKey.COMERCIODETALLE}
      />
      <TabInicioStack.Screen
        component={ComercioGenerar}
        name={AuthNavigationScreenKey.COMERCIOGENERAR}
      />
      <TabInicioStack.Screen
        component={CameraPicker}
        name={AuthNavigationScreenKey.CAMERA}
      />
      <TabInicioStack.Screen
        component={ServicioListado}
        initialParams={{ authenticated: true }}
        name={AuthNavigationScreenKey.SERVICIOLISTADO}
        options={{ headerTitle: 'Servicios' }}
      />
      <TabInicioStack.Screen
        component={ServicioDetalle}
        name={AuthNavigationScreenKey.SERVICIODETALLE}
        options={{ headerTitle: 'Detalle del Servicio' }}
      />
      <TabInicioStack.Screen
        component={ServicioGenerar}
        name={AuthNavigationScreenKey.SERVICIOGENERAR}
        options={{ headerTitle: 'Crear un Servicio' }}
      />
      <TabInicioStack.Screen
        component={DenunciaListado}
        initialParams={{
          authenticated: true,
        }}
        name={AuthNavigationScreenKey.DENUNCIALISTADO}
        options={{ headerTitle: 'Denuncias' }}
      />
      <TabInicioStack.Screen
        component={DenunciaDetalle}
        name={AuthNavigationScreenKey.DENUNCIADETALLE}
        options={{ headerTitle: 'Detalle de la denuncia' }}
      />
      <TabInicioStack.Screen
        component={DenunciaGenerar}
        name={AuthNavigationScreenKey.DENUNCIAGENERAR}
        options={{ headerTitle: 'Generar una denuncia' }}
      />
      <TabInicioStack.Screen
        component={ReclamoListado}
        initialParams={{ authenticated: true }}
        name={AuthNavigationScreenKey.RECLAMOLISTADO}
        options={{ headerTitle: 'Reclamos' }}
      />
      <TabInicioStack.Screen
        component={ReclamoDetalle}
        name={AuthNavigationScreenKey.RECLAMODETALLE}
        options={{ headerTitle: 'Detalle del Reclamo' }}
      />
      <TabInicioStack.Screen
        component={ReclamoGenerar}
        name={AuthNavigationScreenKey.RECLAMOGENERAR}
        options={{ headerTitle: 'Crear Reclamo' }}
      />
    </TabInicioStack.Navigator>
  )
}

const TabNotificacionesStack =
  createStackNavigator<TabNotificacionesParamList>()

function TabNotificacionNavigator() {
  return (
    <TabNotificacionesStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#409DC4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <TabNotificacionesStack.Screen
        component={Notificaciones}
        initialParams={{ authenticated: true }}
        name="Notificaciones"
        options={{ headerShown: false }}
      />
    </TabNotificacionesStack.Navigator>
  )
}
