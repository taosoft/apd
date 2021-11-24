/* eslint-disable react-native/no-inline-styles */
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import useAuth from '../components/providers/useAuth'
import useUser from '../components/providers/useUser'
import { Button } from '../components/Themed'
import { NavigationScreenKey } from '../constants/NavigationKeys'
import { UserModel } from '../services/user.service'

export default function PerfilUsuario(): JSX.Element {
  const [datosUsuario, setDatosUsuario] = useState<UserModel>()
  const [nuevoMail, setNuevoMail] = useState('')
  const [nuevaPassword, setNuevaPassword] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setToken, documento } = useAuth()
  const { getUser } = useUser()
  const { updateUser } = useUser()
  const navigation = useNavigation()
  const loaded = useIsFocused()

  useEffect(() => {
    setIsLoading(true)
    getUser(documento).then((user) => {
      setDatosUsuario(user)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])

  const updateUserData = () => {
    const updateData = {
      contraseña: nuevaPassword,
      email: nuevoMail,
    }
    updateUser(documento, updateData)
      .then(() => Alert.alert('Los datos se han actualizado exitosamente'))
      .catch(() => Alert.alert('Los datos no se han actualizado'))
  }

  const closeSession = () => {
    setToken('')
    navigation.navigate(NavigationScreenKey.LOGIN)
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{ flex: 3, marginTop: 20 }}>
          <View>
            <View style={styles.row}>
              <Text style={styles.titulo}>DNI:</Text>
              <Text style={styles.datos}>{datosUsuario?.documento}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titulo}>Nombre:</Text>
              <Text style={styles.datos}>{datosUsuario?.nombre}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titulo}>Apellido:</Text>
              <Text style={styles.datos}>{datosUsuario?.apellido}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titulo}>Email:</Text>
              <Text style={styles.datos}>{datosUsuario?.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titulo}>Inspector:</Text>
              <Text style={styles.datos}>
                {datosUsuario?.inspector !== 0 ? 'Si' : 'No'}
              </Text>
            </View>
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
              onChangeText={setNuevaPassword}
              placeholder="Ingrese una nueva contraseña"
              placeholderTextColor="#409DC4"
              style={styles.input}
              textContentType="password"
              value={nuevaPassword}
            />
          </View>

          <Button
            isLoading={isLoading}
            onPress={updateUserData}
            text="ACTUALIZAR DATOS"
          />

          <Button
            isLoading={false}
            onPress={closeSession}
            text="CERRAR SESIÓN"
          />
        </View>
      </ScrollView>
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
    fontSize: 14,
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
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  datos: {
    color: '#000',
    flex: 1,
    fontSize: 19,
    paddingLeft: 5,
    paddingTop: 5,
  },
  descripcion: {
    color: '#409DC4',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  groupInputDescription: {
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#000',
    fontSize: 17,
    fontStyle: 'italic',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
    width: 300,
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  titulo: {
    color: '#409DC4',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'justify',
  },
})
