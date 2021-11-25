import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import InputValidator from 'react-native-input-validator'

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
    setDescripcion,
    setDireccion,
    setEmail,
    setTelefono,
    setNombre,
    setNombreServicio,
    setRubro,
  } = useServicio()

  const navigation = useNavigation()
  const { getRubros } = useRubros()
  const [rubros, setRubros] = useState<RubroModel[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  useEffect(() => {
    getRubros().then((res) => {
      setRubros(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    addCachedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage])

  useEffect(() => {
    if (
      servicio.nombreServicio !== '' &&
      servicio.nombrePersona !== '' &&
      servicio.direccion !== '' &&
      servicio.telefono !== '' &&
      servicio.email !== '' &&
      servicio.email !== '' &&
      servicio.descripcion !== ''
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [
    servicio.nombreServicio,
    servicio.nombrePersona,
    servicio.direccion,
    servicio.telefono,
    servicio.email,
    servicio.descripcion,
  ])

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
        <InputValidator
          multiline
          numberOfLines={4}
          onChangeText={setNombreServicio}
          placeholder="Nombre servicio"
          style={styles.input}
          value={servicio.nombreServicio}
        />
        <InputValidator
          multiline
          numberOfLines={4}
          onChangeText={setNombre}
          placeholder="Nombre y Apellido"
          style={styles.input}
          value={servicio.nombrePersona}
        />
        <InputValidator
          multiline
          numberOfLines={4}
          onChangeText={setDireccion}
          placeholder="Dirección"
          style={styles.input}
          value={servicio.direccion}
        />
        <InputValidator
          multiline
          numberOfLines={4}
          onChangeText={setTelefono}
          placeholder="Teléfono de contacto"
          style={styles.input}
          type={'phone'}
          value={servicio.telefono}
        />
        <InputValidator
          multiline
          numberOfLines={4}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          type={'email'}
          value={servicio.email}
        />
        <Text style={styles.subtitle}>Seleccione un rubro</Text>
        <Picker
          onValueChange={(value) => setRubro(value?.toString())}
          selectedValue={servicio.idRubro}
        >
          {rubros.map((rubro, index) => (
            <Picker.Item
              key={index}
              label={rubro.descripcion}
              value={rubro.idRubro}
            />
          ))}
        </Picker>
        <InputValidator
          multiline
          numberOfLines={4}
          onChangeText={setDescripcion}
          placeholder="Descripción"
          style={styles.input}
          value={servicio.descripcion}
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
        <Button
          isDisabled={isDisabled}
          isLoading={isLoading}
          onPress={handleSubmit}
          text="Generar"
        />
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
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
})
