import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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