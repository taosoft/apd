import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button } from 'react-native'

import { Text, View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'

interface DenunciaListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function DenunciaListado({
  route,
}: DenunciaListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button
          onPress={() => {
            navigation.navigate(AuthNavigationScreenKey.DENUNCIAGENERAR)
          }}
          title="Generar Denuncia"
        />
      )}
      <Button
        onPress={() => {
          navigation.navigate(AuthNavigationScreenKey.DENUNCIADETALLE)
        }}
        title="Ver detalle"
      />
      <Text />
    </View>
  )
}
