import React from 'react';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RouteProp, useNavigation } from '@react-navigation/native'

interface ReclamoListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ReclamoListado({route}: ReclamoListadoProps) {
  const { authenticated } = route.params;
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button title="Generar Reclamo" onPress={() => {
          navigation.navigate('ReclamoGenerar')
        }
        }/>
      )}
      <Button title="Ver detalle" onPress={() => {
        navigation.navigate('ReclamoDetalle')
      }
    }/>
      <Text></Text>
    </View>
  );
}
