/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AuthNavigationScreenKey } from '../constants/NavigationKeys'

interface BienvenidoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function Bienvenido({ route }: BienvenidoProps): JSX.Element {
  const navigation = useNavigation()
  const { authenticated } = route.params

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginTop: 40 }}>
        {authenticated && (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(AuthNavigationScreenKey.RECLAMOLISTADO)
              }
              style={styles.button}
            >
              <Text style={styles.text}>Reclamos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(AuthNavigationScreenKey.DENUNCIALISTADO)
              }
              style={styles.button}
            >
              <Text style={styles.text}>Denuncias</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(AuthNavigationScreenKey.COMERCIOLISTADO)
          }
          style={styles.button}
        >
          <Text style={styles.text}>Comercios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(AuthNavigationScreenKey.SERVICIOLISTADO)
          }
          style={styles.button}
        >
          <Text style={styles.text}>Servicios Profesionales</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    width: 300,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: '#409DC4',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
