/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Home from '../screens/Inicio';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabInicioParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Inicio"
      tabBarOptions={{ activeTintColor: '#409DC4' }}
    >
      <BottomTab.Screen
        name="Perfil"
        component={TabOneNavigator}
        options={{
          tabBarIcon: () => TabBarIcon({ name: 'user', color: '#409DC4' })
        }}
      />
      <BottomTab.Screen
        name="Inicio"
        component={TabInicioNavigator}
        options={{
          tabBarIcon: () => TabBarIcon({ name: 'home', color: '#409DC4' })
        }}
      />
      <BottomTab.Screen
        name="Notificaciones"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: () => TabBarIcon({ name: 'notification', color: '#409DC4' })
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
  return <Icon size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={headerOptions("Perfil")}
      />
    </TabOneStack.Navigator>
  );
}

const TabInicioStack = createStackNavigator<TabInicioParamList>();

function TabInicioNavigator() {
  return (
    <TabInicioStack.Navigator>
      <TabInicioStack.Screen
        name="TabInicioScreen"
        component={Home}
        options={headerOptions("Bienvenido")}
      />
    </TabInicioStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={headerOptions("Notificaciones")}
      />
    </TabTwoStack.Navigator>
  );
}

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