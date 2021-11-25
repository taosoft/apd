import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import useAuth from '../components/providers/useAuth'
import useUser from '../components/providers/useUser'

export default function CambiarContrasenia(): JSX.Element {
  const { documento } = useAuth()
  const { resetPassword } = useUser()
  const [dni, setDNI] = useState<string>('')

  const handleSubmit = () => {
    resetPassword(documento).then((res) => {
      if (res) {
        Alert.alert('Se ha enviado un email con la contraseña nueva.')
      } else {
        Alert.alert(
          'No se pudo reiniciar la contraseña.\nPor favor contacte al municipio.',
        )
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginTop: 40 }}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={setDNI}
          placeholder="Ingrese su Documento"
          placeholderTextColor="#409DC4"
          style={styles.input}
          textContentType="username"
          value={dni}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.registrarse}>Reiniciar contraseña</Text>
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
  input: {
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#000',
    fontSize: 18,
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
  municipio: {
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#409DC4',
    fontStyle: 'italic',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    width: 300,
  },
  registrarse: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
