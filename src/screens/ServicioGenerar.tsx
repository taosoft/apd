import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TextInput } from 'react-native'

import ImageContainer from '../components/ImageContainer'
import { GenerateType } from '../components/providers/useCache'
import useRubros from '../components/providers/useRubros'
import useServicio from '../components/providers/useServicios'
import { Button, Text, View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
import { RubroModel } from '../services/rubro.service'

export default function ServicioGenerar(): JSX.Element {
  const {
    submitServicio,
    addCachedImage,
    cachedImage,
    removeImage,
    addImage,
    servicio,
  } = useServicio()
  const navigation = useNavigation()
  const { getRubros } = useRubros()
  const [rubros, setRubros] = useState<RubroModel[]>([])
  const rubroSelected = useRef<string>('')
  const [nombre, setNombre] = useState<string>('')
  const [direccion, setDireccion] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [descripcion, setDescripcion] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getRubros().then((res) => {
      setRubros(res)
    })
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    addCachedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage])

  const handleSubmit = async () => {
    setIsLoading(true)
    const response = await submitServicio()
    if (response) {
      navigation.navigate(AuthNavigationScreenKey.SERVICIOLISTADO)
    }
    setIsLoading(false)
  }

  const deleteImage = (index: number): void => {
    Alert.alert(
      'Seguro desea eliminar la imagen?',
      undefined,
      [
        {
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          onPress: () => removeImage(index),
          text: 'Eliminar',
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setNombre}
          placeholder="Nombre y Apellido"
          style={styles.input}
          value={nombre}
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
        <Picker
          onValueChange={(value) => (rubroSelected.current = value?.toString())}
          selectedValue={rubroSelected.current}
        >
          {rubros.map((rubro, index) => (
            <Picker.Item
              key={index}
              label={rubro.descripcion}
              value={rubro.idRubro}
            />
          ))}
        </Picker>
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
        <Text style={styles.imagenes}>Imagenes (MÁX. 5)</Text>
        <View>
          <ImageContainer
            addImage={addImage}
            data={servicio.images.map((image) => image ?? '')}
            deleteImage={deleteImage}
            generateType={GenerateType.SERVICIO}
            maxImages={5}
            readonly={false}
          />
        </View>
        <Button isLoading={isLoading} onPress={handleSubmit} text="Generar" />
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
