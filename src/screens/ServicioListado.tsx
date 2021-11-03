import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button } from 'react-native'

import { Text, View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'

interface ServicioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ServicioListado({
  route,
}: ServicioListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()

  return (
    <View>
      {authenticated && (
        <Button
          onPress={() => {
            navigation.navigate(AuthNavigationScreenKey.SERVICIOGENERAR)
          }}
          title="Generar Servicio"
        />
      )}
      <Button
        onPress={() => {
          navigation.navigate(AuthNavigationScreenKey.SERVICIODETALLE)
        }}
        title="Ver detalle"
      />
      <Text />
    </View>
  )
}
