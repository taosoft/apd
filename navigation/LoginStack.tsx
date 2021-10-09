import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FinalizaRegistro from '../screens/FinalizaRegistro';
import Login from '../screens/Login';
import AuthenticatedStack from './AuthenticatedStack';

const Stack = createStackNavigator();

export default function LoginStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="FinalizaRegistro"
                component={FinalizaRegistro}
            />
            <Stack.Screen
                name="AuthenticatedStack"
                component={AuthenticatedStack}
            />
        </Stack.Navigator>
    );
}
