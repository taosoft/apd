import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import InputValidator from 'react-native-input-validator'

import ImageContainer from '../components/ImageContainer'
import { GenerateType } from '../components/providers/useCache'
import useComercio from '../components/providers/useComercio'
import { Button, Text, View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'

export default function ComercioGenerar(): JSX.Element {
  const {
    addImage,
    comercio,
    removeImage,
    cachedImage,
    addCachedImage,
    submitComercio,
    setDescripcion,
    setDireccion,
    setNombreComercio,
  } = useComercio()
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  useEffect(() => {
    addCachedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage])

  useEffect(() => {
    if (
      comercio.nombre !== '' &&
      comercio.direccion !== '' &&
      comercio.descripcion !== ''
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [comercio.nombre, comercio.direccion, comercio.descripcion])

  const handleSubmit = async () => {
    setIsLoading(true)
    const response = await submitComercio()
    if (response) {
      navigation.navigate(AuthNavigationScreenKey.COMERCIOLISTADO)
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
          onChangeText={setNombreComercio}
          placeholder="Nombre del comercio"
          style={styles.input}
          value={comercio.nombre}
        />
        <InputValidator
          multiline
          onChangeText={setDireccion}
          placeholder="Dirección"
          style={styles.input}
          value={comercio.direccion}
        />
        {/* Picker time */}
        <InputValidator
          multiline
          numberOfLines={5}
          onChangeText={setDescripcion}
          placeholder="Descripción"
          style={styles.input}
          value={comercio.descripcion}
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
            data={comercio.images.map((image) => image ?? '')}
            deleteImage={deleteImage}
            generateType={GenerateType.RECLAMO}
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
})
