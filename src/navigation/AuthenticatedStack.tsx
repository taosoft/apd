import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import CameraPicker from '../components/Camera'
import Bienvenido from '../screens/Bienvenido'
import ComercioDetalle from '../screens/ComercioDetalle'
import ComercioGenerar from '../screens/ComercioGenerar'
import ComercioListado from '../screens/ComercioListado'
import DenunciaDetalle from '../screens/DenunciaDetalle'
import DenunciaGenerar from '../screens/DenunciaGenerar'
import DenunciaListado from '../screens/DenunciaListado'
import PerfilUsuario from '../screens/PerfilUsuario'
import ReclamoDetalle from '../screens/ReclamoDetalle'
import ReclamoGenerar from '../screens/ReclamoGenerar'
import ReclamoListado from '../screens/ReclamoListado'
import ServicioDetalle from '../screens/ServicioDetalle'
import ServicioGenerar from '../screens/ServicioGenerar'
import ServicioListado from '../screens/ServicioListado'
import TabTwoScreen from '../screens/TabTwoScreen' // Borrar cuando este Notificacion implementado
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
      backBehavior="initialRoute"
      initialRouteName="Inicio"
      tabBarOptions={{ activeTintColor: '#409DC4' }}
    >
      <TabStack.Screen
        component={TabPerfilNavigator}
        name="Perfil"
        options={{
          tabBarIcon: () => TabBarIcon({ color: '#409DC4', name: 'user' }),
        }}
      />
      <TabStack.Screen
        component={TabInicioNavigator}
        name="Inicio"
        options={{
          tabBarIcon: () => TabBarIcon({ color: '#409DC4', name: 'home' }),
        }}
      />
      <TabStack.Screen
        component={TabNotificacionNavigator}
        name="Notificaciones"
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
    <TabPerfilStack.Navigator>
      <TabPerfilStack.Screen
        component={PerfilUsuario}
        name="TabPerfilScreen" // Reemplazar TabOneScreen por Perfil cuando esté implementado
        // options={headerOptions("Perfil")}
      />
    </TabPerfilStack.Navigator>
  )
}

const TabInicioStack = createStackNavigator<TabInicioParamList>()

// Se pasa en las TabXXX.Screen
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const headerOptions = {
  headerStyle: {
    backgroundColor: '#409DC4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

function TabInicioNavigator() {
  return (
    <TabInicioStack.Navigator>
      <TabInicioStack.Screen
        component={Bienvenido}
        initialParams={{ authenticated: true }}
        name="Bienvenido"
        // options={{ headerOptions }}
        options={{ title: '' }}
      />
      <TabInicioStack.Screen
        component={ComercioListado}
        initialParams={{
          authenticated: true,
        }}
        name="ComercioListado"
      />
      <TabInicioStack.Screen
        component={ComercioDetalle}
        name="ComercioDetalle"
      />
      <TabInicioStack.Screen
        component={ComercioGenerar}
        name="ComercioGenerar"
      />
      <TabInicioStack.Screen component={CameraPicker} name="CameraPicker" />
      <TabInicioStack.Screen
        component={ServicioListado}
        initialParams={{ authenticated: true }}
        name="ServicioListado"
        options={{ headerTitle: 'Servicios' }}
      />
      <TabInicioStack.Screen
        component={ServicioDetalle}
        name="ServicioDetalle"
        options={{ headerTitle: 'Detalle del Servicio' }}
      />
      <TabInicioStack.Screen
        component={ServicioGenerar}
        name="ServicioGenerar"
        options={{ headerTitle: 'Crear un Servicio' }}
      />
      <TabInicioStack.Screen
        component={DenunciaListado}
        initialParams={{
          authenticated: true,
        }}
        name="DenunciaListado"
      />
      <TabInicioStack.Screen
        component={DenunciaDetalle}
        name="DenunciaDetalle"
      />
      <TabInicioStack.Screen
        component={DenunciaGenerar}
        name="DenunciaGenerar"
      />
      <TabInicioStack.Screen
        component={ReclamoListado}
        initialParams={{ authenticated: true }}
        name="ReclamoListado"
        options={{ headerTitle: 'Reclamos' }}
      />
      <TabInicioStack.Screen
        component={ReclamoDetalle}
        name="ReclamoDetalle"
        options={{ headerTitle: 'Detalle del Reclamo' }}
      />
      <TabInicioStack.Screen
        component={ReclamoGenerar}
        name="ReclamoGenerar"
        options={{ headerTitle: 'Crear Reclamo' }}
      />
    </TabInicioStack.Navigator>
  )
}

const TabNotificacionesStack =
  createStackNavigator<TabNotificacionesParamList>()

function TabNotificacionNavigator() {
  return (
    <TabNotificacionesStack.Navigator>
      <TabNotificacionesStack.Screen
        component={TabTwoScreen}
        name="TabNotificacionesScreen" // Reemplazar TabTwoScreen por Notificacion cuando esté implementado
        // options={headerOptions("Notificaciones")}
      />
    </TabNotificacionesStack.Navigator>
  )
}
