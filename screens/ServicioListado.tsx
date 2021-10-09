import React from 'react';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RouteProp, useNavigation } from '@react-navigation/native'

interface ServicioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ServicioListado({route}: ServicioListadoProps) {
  const { authenticated } = route.params;
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button title="Generar Servicio" onPress={() => {
          navigation.navigate('ServicioGenerar')
        }
        }/>
      )}
      <Button title="Ver detalle" onPress={() => {
        navigation.navigate('ServicioDetalle')
      }
    }/>
      <Text></Text>
    </View>
  );
}
