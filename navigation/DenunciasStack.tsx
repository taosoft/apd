import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DenunciaListado from '../screens/DenunciaListado';
import { RouteProp } from '@react-navigation/native';
import DenunciaDetalle from '../screens/DenunciaDetalle';
import DenunciaGenerar from '../screens/DenunciaGenerar';

const Stack = createStackNavigator();

interface DenunciaStackProps {
    route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function DenunciasStack({route}: DenunciaStackProps) {
    const { authenticated } = route.params;

    return (
        <Stack.Navigator
            initialRouteName="DenunciaListado"
        >
            <Stack.Screen
                name="DenunciaListado"
                component={DenunciaListado}
                initialParams={
                    {
                        authenticated
                    }
                }
            />
            <Stack.Screen
                name="DenunciaDetalle"
                component={DenunciaDetalle}
            />
            {authenticated && (
                <Stack.Screen
                    name="DenunciaGenerar"
                    component={DenunciaGenerar}
                />
            )}
        </Stack.Navigator>
    );
}
