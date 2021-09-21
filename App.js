import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Reclamos from './Reclamos';
import Denuncias from './Denuncia';
import Comercios from './Comercio';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Bienvenido",
            headerStyle: {
              backgroundColor: '#409DC4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Reclamos"
          component={Reclamos}
          options={{
            title: "Reclamos",
            headerStyle: {
              backgroundColor: '#409DC4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Denuncias"
          component={Denuncias}
          options={{
            title: "Denuncias",
            headerStyle: {
              backgroundColor: '#409DC4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Comercios"
          component={Comercios}
          options={{
            title: "Comercios",
            headerStyle: {
              backgroundColor: '#409DC4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;