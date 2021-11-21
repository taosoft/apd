// import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TextInput } from 'react-native'

// import useComercio from '../components/providers/useComercio'
import { Button, Text, View } from '../components/Themed'

export default function ComercioGenerar(): JSX.Element {
  // const { createComercios } = useComercio()
  // const navigation = useNavigation()
  const [nombreComercio, setNombreComercio] = useState<string>('')
  const [direccion, setDireccion] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [descripcion, setDescripcion] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleSubmit = () => {
    Alert.alert(nombreComercio)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setNombreComercio}
          placeholder="Nombre del comercio"
          style={styles.input}
          value={nombreComercio}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setDireccion}
          placeholder="Dirección"
          style={styles.input}
          value={direccion}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setTelefono}
          placeholder="Teléfono de contacto"
          style={styles.input}
          value={telefono}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          value={email}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setDescripcion}
          placeholder="Descripción"
          style={styles.input}
          value={descripcion}
        />
        <View
          darkColor="rgba(255,255,255,0.1)"
          lightColor="#EEE"
          style={styles.separator}
        />
        <Text style={styles.imagenes}>Imagenes</Text>
        {/* <View>
          <ImageContainer
            addImage={addImage}
            data={reclamo.images.map((image) => image ?? '')}
            deleteImage={deleteImage}
            generateType={GenerateType.RECLAMO}
            maxImages={7}
            readonly={false}
          />
        </View> */}
        <Button isLoading={isLoading} onPress={handleSubmit} text="Enviar" />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  imagenes: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    fontSize: 20,
    height: 40,
    margin: 12,
    padding: 10,
  },
  inputRed: {
    borderColor: 'red',
    borderWidth: 1,
    fontSize: 20,
    height: 40,
    margin: 12,
    padding: 10,
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
})
