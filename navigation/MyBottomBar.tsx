import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabParamList, TabPerfilParamList, TabNotificacionesParamList, TabInicioParamList } from '../types';
import Icon from 'react-native-vector-icons/AntDesign';
import Bienvenido from '../screens/Bienvenido';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Bienvenido"
            tabBarOptions={{ activeTintColor: '#409DC4' }}
        >
            <Tab.Screen
                name="Perfil"
                component={TabTwoScreen}
                options={{
                    tabBarIcon: () => TabBarIcon({ name: 'user', color: '#409DC4' })
                }}
            />
            <Tab.Screen
                name="Bienvenido"
                component={Bienvenido}
                options={{
                    tabBarIcon: () => TabBarIcon({ name: 'home', color: '#409DC4' })
                }}
            />
            <Tab.Screen
                name="Notificaciones"
                component={TabOneScreen}
                options={{
                    tabBarIcon: () => TabBarIcon({ name: 'notification', color: '#409DC4' })
                }}
            />
        </Tab.Navigator>
    );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
    return <Icon size={30} style={{ marginBottom: -3 }} {...props} />;
}


const TabPerfilStack = createStackNavigator<TabPerfilParamList>();

function TabPerfilNavigator() {
    return (
        <TabPerfilStack.Navigator>
            <TabPerfilStack.Screen
                name="TabPerfilScreen"
                component={TabOneScreen} // Reemplazar TabOneScreen por Perfil cuando esté implementado
                options={headerOptions("Perfil")}
            />
        </TabPerfilStack.Navigator>
    );
};

const TabBienvenidoStack = createStackNavigator<TabInicioParamList>();

function TabBienvenidoNavigator() {
    return (
        <TabBienvenidoStack.Navigator>
            <TabBienvenidoStack.Screen
                name="TabInicioScreen"
                component={Bienvenido}
                options={headerOptions("Bienvenido")}
            />
        </TabBienvenidoStack.Navigator>
    );
};

const TabNotificacionesStack = createStackNavigator<TabNotificacionesParamList>();

function TabNotificacionNavigator() {
    return (
        <TabNotificacionesStack.Navigator>
            <TabNotificacionesStack.Screen
                name="TabNotificacionesScreen"
                component={TabTwoScreen} // Reemplazar TabTwoScreen por Notificacion cuando esté implementado
                options={headerOptions("Notificaciones")}
            />
        </TabNotificacionesStack.Navigator>
    );
};

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
