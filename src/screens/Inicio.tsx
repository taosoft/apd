/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
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
      <ImageBackground
        source={{
          uri: 'https://res.cloudinary.com/dmdkxer66/image/upload/v1636057175/Logos/MunicipaliApp_2_qa5xdv.png',
        }}
        style={{ height: windowHeight, width: windowWidth }}
      >

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: windowHeight * 0.7,
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
            flex: 1,
            flexDirection: 'row',
            marginBottom: windowHeight * 0.02,
            marginTop: windowHeight * 0.02,
            marginLeft: windowWidth * 0.05,
            marginRight: windowWidth * 0.05,
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
      </ImageBackground>
    </View>
  )
}

const styles = (widthScreen = 150) =>
  StyleSheet.create({
    button: {
      backgroundColor: '#409DC4',
      borderColor: '#FFF',
      borderRadius: 20,
      borderWidth: 1,
      justifyContent: 'space-evenly',
      width: widthScreen * 0.9,
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
