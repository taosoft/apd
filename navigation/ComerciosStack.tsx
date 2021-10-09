import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ComercioListado from '../screens/ComercioListado';
import { RouteProp } from '@react-navigation/native';
import ComercioDetalle from '../screens/ComercioDetalle';
import ComercioGenerar from '../screens/ComercioGenerar';

const Stack = createStackNavigator();

interface ComercioStackProps {
    route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ComerciosStack({route}: ComercioStackProps) {
    const { authenticated } = route.params;

    return (
        <Stack.Navigator
            initialRouteName="ComercioListado"
        >
            <Stack.Screen
                name="ComercioListado"
                component={ComercioListado}
                initialParams={
                    {
                        authenticated
                    }
                }
            />
            <Stack.Screen
                name="ComercioDetalle"
                component={ComercioDetalle}
            />
            {authenticated && (
                <Stack.Screen
                    name="ComercioGenerar"
                    component={ComercioGenerar}
                />
            )}
        </Stack.Navigator>
    );
}
