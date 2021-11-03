import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button } from 'react-native'

import { Text, View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'

interface ComercioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ComercioListado({
  route,
}: ComercioListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button
          onPress={() => {
            navigation.navigate(AuthNavigationScreenKey.COMERCIOGENERAR)
          }}
          title="Generar Comercio"
        />
      )}
      <Button
        onPress={() => {
          navigation.navigate(AuthNavigationScreenKey.COMERCIODETALLE)
        }}
        title="Ver detalle"
      />
      <Text />
    </View>
  )
}
