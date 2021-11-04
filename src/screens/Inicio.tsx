/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { NavigationScreenKey } from '../constants/NavigationKeys'

export default function Inicio(): JSX.Element {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()

  return (
    <View style={styles().container}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dmdkxer66/image/upload/v1636056926/Logos/MunicipaliApp_1_xv6gcq.png' }}
        style={{ height: windowHeight * 0.8, width: windowWidth }}
      />

      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationScreenKey.LOGIN)}
          style={styles(windowWidth * 0.5).button}
        >
          <Text style={styles().text}>INICIAR SESION</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationScreenKey.REGISTRARSE)}
          style={styles(windowWidth * 0.5).button}
        >
          <Text style={styles().text}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavigationScreenKey.UNAUTHENTICATED_STACK)
          }
          style={styles(windowWidth).button}
        >
          <Text style={styles().text}>SERVICIOS Y COMERCIOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = (widthScreen = 150) =>
  StyleSheet.create({
    button: {
      backgroundColor: '#409DC4',
      borderColor: '#FFF',
      borderRadius: 20,
      borderWidth: 5,
      justifyContent: 'space-evenly',
      width: widthScreen,
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    text: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  })
