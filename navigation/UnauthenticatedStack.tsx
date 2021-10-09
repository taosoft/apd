import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Bienvenido from '../screens/Bienvenido';
import ComerciosStack from './ComerciosStack';
import ServiciosStack from './ServiciosStack';

const Stack = createStackNavigator();

export default function UnauthenticatedStack() {
    return (
        <Stack.Navigator
            initialRouteName="UnauthenticatedBienvenido"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name="UnauthenticatedBienvenido"
                component={Bienvenido}
                initialParams={
                    {
                        authenticated: false
                    }
                }
            />
            <Stack.Screen
                name="ComerciosStack"
                component={ComerciosStack}
                initialParams={
                    {
                        authenticated: false
                    }
                }
            />
            <Stack.Screen
                name="ServiciosStack"
                component={ServiciosStack}
                initialParams={
                    {
                        authenticated: false
                    }
                }
            />
        </Stack.Navigator>
    );
}
