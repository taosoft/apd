import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
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
          onChangeText={setNombreServicio}
          placeholder="Nombre servicio"
          style={styles.input}
          value={servicio.nombreServicio}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setNombre}
          placeholder="Nombre y Apellido"
          style={styles.input}
          value={servicio.nombrePersona}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setDireccion}
          placeholder="Direcci??n"
          style={styles.input}
          value={servicio.direccion}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setTelefono}
          placeholder="Tel??fono de contacto"
          style={styles.input}
          value={servicio.telefono}
        />
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
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
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setDescripcion}
          placeholder="Descripci??n"
          style={styles.input}
          value={servicio.descripcion}
        />
        <View
          darkColor="rgba(255,255,255,0.1)"
          lightColor="#EEE"
          style={styles.separator}
        />
        <Text style={styles.imagenes}>Imagenes (M??X. 5)</Text>
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
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
})
