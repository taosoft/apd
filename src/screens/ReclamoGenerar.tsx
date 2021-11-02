import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TextInput } from 'react-native'

import ImageContainer from '../components/ImageContainer'
import { GenerateType } from '../components/providers/useCache'
import useReclamos from '../components/providers/useReclamos'
import { Button, Text, View } from '../components/Themed'

export default function ReclamoGenerar(): JSX.Element {
  const {
    addCachedImage,
    addImage,
    cachedImage,
    removeImage,
    reclamo,
    submitReclamo,
  } = useReclamos()

  const [reclamoLugar, setReclamoLugar] = useState<string>(reclamo.lugar)
  const [reclamoRubro, setReclamoRubro] = useState<string>(reclamo.rubro)
  const [reclamoDesperfecto, setReclamoDesperfecto] = useState<string>(
    reclamo.desperfecto,
  )
  const [reclamoReason, setReclamoReason] = useState<string>(reclamo.reason)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    submitReclamo()
    setIsLoading(false)
  }

  useEffect(() => {
    addCachedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage])

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
          onChangeText={setReclamoLugar}
          placeholder="Lugar"
          style={styles.input}
          value={reclamoLugar}
        />
        <TextInput
          onChangeText={setReclamoRubro}
          placeholder="Rubro"
          style={styles.input}
          value={reclamoRubro}
        />
        <TextInput
          onChangeText={setReclamoDesperfecto}
          placeholder="Dirección del vecino o comercio"
          style={styles.input}
          value={reclamoDesperfecto}
        />
        <TextInput
          onChangeText={setReclamoReason}
          placeholder="Motivo de la reclamo"
          style={styles.input}
          value={reclamoReason}
        />
        <View
          darkColor="rgba(255,255,255,0.1)"
          lightColor="#eee"
          style={styles.separator}
        />
        <Text style={styles.imagenes}>Imagenes</Text>
        <View>
          <ImageContainer
            addImage={addImage}
            data={reclamo.images.map((image) => image ?? '')}
            deleteImage={deleteImage}
            generateType={GenerateType.RECLAMO}
            maxImages={7}
            readonly={false}
          />
        </View>
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
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
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
