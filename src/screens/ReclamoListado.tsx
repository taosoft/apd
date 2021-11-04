import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button } from 'react-native'

import { Text, View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'

interface ReclamoListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ReclamoListado({
  route,
}: ReclamoListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button
          onPress={() => {
            navigation.navigate(AuthNavigationScreenKey.RECLAMOGENERAR)
          }}
          title="Generar Reclamo"
        />
      )}
      <Button
        onPress={() => {
          navigation.navigate(AuthNavigationScreenKey.RECLAMODETALLE)
        }}
        title="Ver detalle"
      />
      <Text />
    </View>
  )
}
