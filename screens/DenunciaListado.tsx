import React from 'react';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RouteProp, useNavigation } from '@react-navigation/native'

interface DenunciaListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function DenunciaListado({route}: DenunciaListadoProps) {
  const { authenticated } = route.params;
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button title="Generar Denuncia" onPress={() => {
          navigation.navigate('DenunciaGenerar')
        }
        }/>
      )}
      <Button title="Ver detalle" onPress={() => {
        navigation.navigate('DenunciaDetalle')
      }
    }/>
      <Text></Text>
    </View>
  );
}
