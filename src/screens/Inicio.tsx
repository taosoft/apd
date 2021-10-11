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

export default function Inicio(): JSX.Element {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()

  return (
    <View style={styles().container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/600/92c952' }}
        style={{ height: windowHeight * 0.6, width: windowWidth }}
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
          onPress={() => navigation.navigate('Login')}
          style={styles(windowWidth * 0.5).button}
        >
          <Text style={styles().text}>INICIAR SESION</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registrarse')}
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
          onPress={() => navigation.navigate('UnauthenticatedStack')}
          style={styles(windowWidth * 0.5).button}
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
