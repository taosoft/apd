import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Bienvenido from '../screens/Bienvenido';

import TabOneScreen from '../screens/TabOneScreen'; // Borrar cuando este Perfil implementado
import TabTwoScreen from '../screens/TabTwoScreen'; // Borrar cuando este Notificacion implementado
import { BottomTabParamList, TabPerfilParamList, TabNotificacionesParamList, TabInicioParamList } from '../types';
import ComerciosStack from './ComerciosStack';
import DenunciasStack from './DenunciasStack';
import { TabBarIcon } from './helpers';
import ReclamosStack from './ReclamosStack';
import ServiciosStack from './ServiciosStack';

const TabStack = createBottomTabNavigator<BottomTabParamList>();

export default function AuthenticatedStack(): JSX.Element {

  return (
    <TabStack.Navigator
      initialRouteName="Inicio"
      tabBarOptions={{ activeTintColor: '#409DC4' }}
      backBehavior="initialRoute"
    >
      <TabStack.Screen
        name="Perfil"
        component={TabPerfilNavigator}
        options={{
          tabBarIcon: () => TabBarIcon({ name: 'user', color: '#409DC4' })
        }}
      />
      <TabStack.Screen
        name="Inicio"
        component={TabInicioNavigator}
        options={{
          tabBarIcon: () => TabBarIcon({ name: 'home', color: '#409DC4' })
        }}
      />
      <TabStack.Screen
        name="Notificaciones"
        component={TabNotificacionNavigator}
        options={{
          tabBarIcon: () => TabBarIcon({ name: 'notification', color: '#409DC4' })
        }}
      />
    </TabStack.Navigator>
  );
}

const TabPerfilStack = createStackNavigator<TabPerfilParamList>();

function TabPerfilNavigator() {
  return (
    <TabPerfilStack.Navigator>
      <TabPerfilStack.Screen
        name="TabPerfilScreen"
        component={TabOneScreen} // Reemplazar TabOneScreen por Perfil cuando esté implementado
        // options={headerOptions("Perfil")}
      />
    </TabPerfilStack.Navigator>
  );
}

const TabInicioStack = createStackNavigator<TabInicioParamList>();

function TabInicioNavigator() {
  return (
    <TabInicioStack.Navigator
    >
      <TabInicioStack.Screen
        name="TabInicioScreen"
        component={Bienvenido}
        // options={headerOptions("Bienvenido")}
        initialParams={
          {
              authenticated: true
          }
        }
      />
      <TabInicioStack.Screen
        name="ComerciosStack"
        component={ComerciosStack}
        initialParams={
          {
              authenticated: true
          }
        }
      />
      <TabInicioStack.Screen
        name="ServiciosStack"
        component={ServiciosStack}
        initialParams={
          {
              authenticated: true
          }
        }
      />
      <TabInicioStack.Screen
        name="DenunciasStack"
        component={DenunciasStack}
        initialParams={
          {
              authenticated: true
          }
        }
      />
      <TabInicioStack.Screen
        name="ReclamosStack"
        component={ReclamosStack}
        initialParams={
          {
              authenticated: true
          }
        }
      />
    </TabInicioStack.Navigator>
  );
}

const TabNotificacionesStack = createStackNavigator<TabNotificacionesParamList>();

function TabNotificacionNavigator() {
  return (
    <TabNotificacionesStack.Navigator>
      <TabNotificacionesStack.Screen
        name="TabNotificacionesScreen"
        component={TabTwoScreen} // Reemplazar TabTwoScreen por Notificacion cuando esté implementado
        // options={headerOptions("Notificaciones")}
      />
    </TabNotificacionesStack.Navigator>
  );
}

// Se pasa en las TabXXX.Screen
const headerOptions = (title: string) => {
  return ({
    headerTitle: title,
    headerStyle: {
      backgroundColor: '#409DC4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  });
};
