/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
              onPress={() => navigation.navigate('ReclamoListado')}
              style={styles.button}
            >
              <Text style={styles.text}>Reclamos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DenunciaListado')}
              style={styles.button}
            >
              <Text style={styles.text}>Denuncias</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('ComercioListado')}
          style={styles.button}
        >
          <Text style={styles.text}>Comercios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ServicioListado')}
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titlePosition: {
    alignSelf: 'flex-start',
    flex: 1,
    marginLeft: 30,
    position: 'relative',
  },
  titleText: {
    color: '#409DC4',
    fontFamily: 'sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 70,
  },
})
