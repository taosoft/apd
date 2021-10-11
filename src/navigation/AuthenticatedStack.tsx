import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Bienvenido from '../screens/Bienvenido'
import PerfilUsuario from '../screens/DatosUsuario'
import TabTwoScreen from '../screens/TabTwoScreen' // Borrar cuando este Notificacion implementado
import {
  BottomTabParamList,
  TabInicioParamList,
  TabNotificacionesParamList,
  TabPerfilParamList,
} from '../types'
import ComerciosStack from './ComerciosStack'
import DenunciasStack from './DenunciasStack'
import { TabBarIcon } from './helpers'
import ReclamosStack from './ReclamosStack'
import ServiciosStack from './ServiciosStack'

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
    <TabPerfilStack.Navigator screenOptions={{ headerShown: false }}>
      <TabPerfilStack.Screen
        component={PerfilUsuario}
        name="TabPerfilScreen"
        // options={headerOptions("Perfil")}
      />
    </TabPerfilStack.Navigator>
  )
}

const TabInicioStack = createStackNavigator<TabInicioParamList>()

function TabInicioNavigator() {
  return (
    <TabInicioStack.Navigator screenOptions={{ headerShown: false }}>
      <TabInicioStack.Screen
        component={Bienvenido}
        initialParams={{ authenticated: true }}
        // options={headerOptions("Bienvenido")}
        name="TabInicioScreen"
      />
      <TabInicioStack.Screen
        component={ComerciosStack}
        initialParams={{ authenticated: true }}
        name="ComerciosStack"
      />
      <TabInicioStack.Screen
        component={ServiciosStack}
        initialParams={{ authenticated: true }}
        name="ServiciosStack"
      />
      <TabInicioStack.Screen
        component={DenunciasStack}
        initialParams={{ authenticated: true }}
        name="DenunciasStack"
      />
      <TabInicioStack.Screen
        component={ReclamosStack}
        initialParams={{ authenticated: true }}
        name="ReclamosStack"
      />
    </TabInicioStack.Navigator>
  )
}

const TabNotificacionesStack =
  createStackNavigator<TabNotificacionesParamList>()

function TabNotificacionNavigator() {
  return (
    <TabNotificacionesStack.Navigator screenOptions={{ headerShown: false }}>
      <TabNotificacionesStack.Screen
        component={TabTwoScreen}
        name="TabNotificacionesScreen" // Reemplazar TabTwoScreen por Notificacion cuando esté implementado
        // options={headerOptions("Notificaciones")}
      />
    </TabNotificacionesStack.Navigator>
  )
}

// Se pasa en las TabXXX.Screen
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const headerOptions = (title: string) => {
  return {
    headerStyle: {
      backgroundColor: '#409DC4',
    },
    headerTintColor: '#fff',
    headerTitle: title,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}
