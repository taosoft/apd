import React from 'react';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RouteProp, useNavigation } from '@react-navigation/native'

interface ComercioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ComercioListado({route}: ComercioListadoProps) {
  const { authenticated } = route.params;
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button title="Generar Comercio" onPress={() => {
          navigation.navigate('ComercioGenerar')
        }
        }/>
      )}
      <Button title="Ver detalle" onPress={() => {
        navigation.navigate('ComercioDetalle')
      }
    }/>
      <Text></Text>
    </View>
  );
}
