import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServicioListado from '../screens/ServicioListado';
import { RouteProp } from '@react-navigation/native';
import ServicioDetalle from '../screens/ServicioDetalle';
import ServicioGenerar from '../screens/ServicioGenerar';

const Stack = createStackNavigator();

interface ServicioStackProps {
    route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ServiciosStack({route}: ServicioStackProps) {
    const { authenticated } = route.params;

    return (
        <Stack.Navigator
            initialRouteName="ServicioListado"
        >
            <Stack.Screen
                name="ServicioListado"
                component={ServicioListado}
                initialParams={
                    {
                        authenticated
                    }
                }
            />
            <Stack.Screen
                name="ServicioDetalle"
                component={ServicioDetalle}
            />
            {authenticated && (
                <Stack.Screen
                    name="ServicioGenerar"
                    component={ServicioGenerar}
                />
            )}
        </Stack.Navigator>
    );
}
