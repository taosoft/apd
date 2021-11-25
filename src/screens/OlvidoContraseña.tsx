import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'

import useUser from '../components/providers/useUser'
import { Button } from '../components/Themed'

export default function CambiarContrasenia(): JSX.Element {
  const { resetPassword } = useUser()
  const navigation = useNavigation()
  const [dni, setDNI] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const handleSubmit = () => {
    setIsLoading(true)
    resetPassword(dni)
      .then((res) => {
        setIsLoading(false)
        if (res) {
          Alert.alert('Se ha enviado un email con la contraseña nueva.')
          navigation.goBack()
        } else {
          Alert.alert(
            'No se pudo reiniciar la contraseña.\nPor favor contacte al municipio.',
          )
        }
      })
      .catch(() =>
        Alert.alert(
          'Ocurrió un error al reiniciar la contraseña. Contáctese con el municipio para más información',
        ),
      )
  }

  useEffect(() => {
    setIsDisabled(dni === '')
  }, [dni])

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

        <Button
          isDisabled={isDisabled}
          isLoading={isLoading}
          onPress={handleSubmit}
          text="Reiniciar contraseña"
        />
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
