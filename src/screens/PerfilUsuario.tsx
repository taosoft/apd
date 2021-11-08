/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import useUser from '../components/providers/useUser'
import { UserModel } from '../services/user.service'

export default function PerfilUsuario(): JSX.Element {
  const [datosUsuario, setDatosUsuario] = useState<UserModel>()
  const [nuevoMail, setNuevoMail] = useState('')
  const [nuevaPassword, setNuevaPasword] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { getUser } = useUser()

  useEffect(() => {
    setIsLoading(true)
    getUser('1234').then((user) => {
      setDatosUsuario(user)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginTop: 20 }}>
        <View>
          <Text style={styles.datos}>DNI: {datosUsuario?.documento}</Text>
          <Text style={styles.datos}>Nombre: {datosUsuario?.nombre}</Text>
          <Text style={styles.datos}>Apellido:{datosUsuario?.apellido}</Text>
          <Text style={styles.datos}>Email: {datosUsuario?.email}</Text>
          <Text style={styles.datos}>
            Inspector: {datosUsuario?.inspector !== 0 ? 'Si' : 'No'}
          </Text>
        </View>

        <View style={styles.groupInputDescription}>
          <Text style={styles.descripcion}>CAMBIO DE EMAIL</Text>
          <TextInput
            keyboardType="email-address"
            onChangeText={setNuevoMail}
            placeholder="Ingrese un nuevo email"
            placeholderTextColor="#409DC4"
            style={styles.input}
            textContentType="emailAddress"
            value={nuevoMail}
          />
        </View>

        <View style={styles.groupInputDescription}>
          <Text style={styles.descripcion}>CAMBIO DE CONTRASEÑA</Text>
          <TextInput
            keyboardType="visible-password"
            onChangeText={setNuevaPasword}
            placeholder="Ingrese una nueva contraseña"
            placeholderTextColor="#409DC4"
            style={styles.input}
            textContentType="password"
            value={nuevaPassword}
          />
        </View>

        <TouchableOpacity
          onPress={() => Alert.alert('Datos actualizados')}
          style={styles.button}
        >
          <Text style={styles.actualizarDatos}>ACTUALIZAR DATOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actualizarDatos: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#409DC4',
    borderColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
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
  datos: {
    color: '#409DC4',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'justify',
  },
  descripcion: {
    color: '#409DC4',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  groupInputDescription: {
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#000',
    fontStyle: 'italic',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
    width: 300,
  },
})
