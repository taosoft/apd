import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReclamoListado from '../screens/ReclamoListado';
import { RouteProp } from '@react-navigation/native';
import ReclamoDetalle from '../screens/ReclamoDetalle';
import ReclamoGenerar from '../screens/ReclamoGenerar';

const Stack = createStackNavigator();

interface ReclamoStackProps {
    route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ReclamosStack({route}: ReclamoStackProps) {
    const { authenticated } = route.params;

    return (
        <Stack.Navigator
            initialRouteName="ReclamoListado"
        >
            <Stack.Screen
                name="ReclamoListado"
                component={ReclamoListado}
                initialParams={
                    {
                        authenticated
                    }
                }
            />
            <Stack.Screen
                name="ReclamoDetalle"
                component={ReclamoDetalle}
            />
            {authenticated && (
                <Stack.Screen
                    name="ReclamoGenerar"
                    component={ReclamoGenerar}
                />
            )}
        </Stack.Navigator>
    );
}
