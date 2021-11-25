/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { baseUrl } from '../common/values'
import useAuth from '../components/providers/useAuth'
import { Button } from '../components/Themed'
import { NavigationScreenKey } from '../constants/NavigationKeys'

export default function Login(): JSX.Element {
  const navigator = useNavigation()
  const [docu, setDocu] = useState<string>('')
  const [clave, setClave] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setLoginResponse, token } = useAuth()

  useEffect(() => {
    if (token !== '') {
      navigator.navigate(NavigationScreenKey.AUTHENTICATED_STACK)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const ingresar = () => {
    if (clave === '' || docu === '') {
      Alert.alert('Los campos deben estar completos')
    }
    // else if (docu.length !== 8) {
    //  Alert.alert('El documento debe tener 8 dígitos')
    // }
    else {
      setIsLoading(true)
      const data = {
        contraseña: clave,
        documento: docu,
      }

      axios
        .post(`${baseUrl}/users/login`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setLoginResponse(
            res.data.data.token,
            res.data.data.user.documento,
            res.data.data.user.inspector === 1,
          )
          setIsLoading(false)
          setClave('')
          setDocu('')
          navigator.navigate(NavigationScreenKey.AUTHENTICATED_STACK)
        })
        .catch((e) => {
          setIsLoading(false)
          setLoginResponse('', '', false)
          console.log(e)
          Alert.alert('Documento y/o contraseña incorrecta')
          setDocu('')
          setClave('')
        })
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginTop: 40 }}>
        <TextInput
          keyboardType="email-address"
          onChangeText={setDocu}
          placeholder="Ingrese su Documento o Legajo"
          placeholderTextColor="#409DC4"
          style={styles.input}
          textContentType="username"
          value={docu}
        />

        <TextInput
          keyboardType="ascii-capable"
          onChangeText={setClave}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#409DC4"
          secureTextEntry={true}
          style={styles.input}
          textContentType="password"
          value={clave}
        />

        <Button isLoading={isLoading} onPress={ingresar} text="INGRESAR" />

        <TouchableOpacity
          onPress={() =>
            navigator.navigate(NavigationScreenKey.UNAUTHENTICATED_STACK)
          }
        >
          <Text style={styles.sinUsuario}>Ingresar sin usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigator.navigate(NavigationScreenKey.RESETEAR_PASSWORD)
          }
        >
          <Text style={styles.resetPassword}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#000',
    fontSize: 17,
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
  resetPassword: {
    borderBottomWidth: 1,
    borderColor: '#C9E9FC',
    color: '#409DC4',
    fontSize: 20,
    fontStyle: 'italic',
    marginLeft: 30,
    marginTop: 20,
    textAlign: 'left',
    width: 190,
  },
  sinUsuario: {
    borderBottomWidth: 1,
    borderColor: '#C9E9FC',
    color: '#409DC4',
    fontSize: 20,
    fontStyle: 'italic',
    marginLeft: 30,
    marginTop: 20,
    textAlign: 'left',
    width: 173,
  },
})
