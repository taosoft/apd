/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import useAuth from '../components/providers/useAuth'
import { NavigationScreenKey } from '../constants/NavigationKeys'

export default function Login(): JSX.Element {
  const navigator = useNavigation()
  const [docu, setDocu] = useState('')
  const [clave, setClave] = useState('')
  const { setToken } = useAuth()

  const ingresar = () => {
    const data = {
      contraseña: clave,
      documento: docu,
    }

    axios
      .post('http://192.168.0.25/users/login', JSON.stringify(data), {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        console.log('login')
        setToken(res.data.token)
        navigator.navigate(NavigationScreenKey.AUTHENTICATED_STACK)
      })
      .catch((e) => {
        console.log(e)
        Alert.alert('Documento y/o contraseña incorrecta')
      })
    // TODO: Agregar popup con información para el usuario
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginTop: 40 }}>
        <TextInput
          keyboardType="email-address"
          onChangeText={setDocu}
          placeholder="Ingrese su DNI o Legajo"
          placeholderTextColor="#409DC4"
          style={styles.input}
          textContentType="username"
          value={docu}
        />

        <TextInput
          keyboardType="ascii-capable"
          onChangeText={setClave}
          placeholder="Ingrese su clave"
          placeholderTextColor="#409DC4"
          secureTextEntry={true}
          style={styles.input}
          textContentType="password"
          value={clave}
        />

        <TouchableOpacity onPress={() => ingresar()} style={styles.button}>
          <Text style={styles.ingresar}>INGRESAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigator.navigate(NavigationScreenKey.AUTHENTICATED_STACK)
          }
        >
          <Text style={styles.sinUsuario}>Ingrese sin usuario</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#409DC4',
    borderColor: '#FFF',
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
  ingresar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#000',
    fontStyle: 'italic',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
    width: 300,
  },
  sinUsuario: {
    borderBottomWidth: 1,
    borderColor: '#C9E9FC',
    color: '#409DC4',
    fontStyle: 'italic',
    marginLeft: 30,
    marginTop: 20,
    textAlign: 'left',
    width: 118,
  },
})
