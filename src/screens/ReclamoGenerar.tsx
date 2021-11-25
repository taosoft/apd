import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import TextInput from 'react-native-input-validator'

import ImageContainer from '../components/ImageContainer'
import { GenerateType } from '../components/providers/useCache'
import useDesperfecto from '../components/providers/useDesperfecto'
import useReclamos from '../components/providers/useReclamos'
import useRubros from '../components/providers/useRubros'
import useSitio from '../components/providers/useSitios'
import { Button, Text, View } from '../components/Themed'
import { DesperfectoModel } from '../services/desperfecto.service'
import { RubroModel } from '../services/rubro.service'
import { SitioModel } from '../services/sitio.service'

export default function ReclamoGenerar(): JSX.Element {
  const {
    addCachedImage,
    addImage,
    cachedImage,
    removeImage,
    reclamo,
    submitReclamo,
    setDesperfecto,
    setLugar,
    setReason,
    setRubro,
  } = useReclamos()

  const { getSitios } = useSitio()
  const { getDesperfectos } = useDesperfecto()
  const { getRubros } = useRubros()
  const navigation = useNavigation()

  const [sitios, setSitios] = useState<SitioModel[]>([])
  const [desperfectos, setDesperfectos] = useState<DesperfectoModel[]>([])
  const [rubros, setRubros] = useState<RubroModel[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getSitios().then((sitiosResponse) => setSitios(sitiosResponse))
    getRubros().then((rubrosResponse) => setRubros(rubrosResponse))
    getDesperfectos().then((desperfectosResponse) =>
      setDesperfectos(desperfectosResponse),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    const response = await submitReclamo()
    setIsLoading(false)
    if (response) {
      navigation.goBack()
    }
  }

  useEffect(() => {
    addCachedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage])

  const deleteImage = (index: number): void => {
    Alert.alert(
      '¿Seguro desea eliminar la imagen?',
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
        <Text style={styles.subtitle}>Seleccione un lugar</Text>
        <Picker
          onValueChange={(value) => setLugar(value?.toString())}
          selectedValue={reclamo.idSitio}
        >
          {sitios.map((sitio, index) => (
            <Picker.Item
              key={index}
              label={sitio.descripcion}
              value={sitio.idSitio}
            />
          ))}
        </Picker>
        <Text style={styles.subtitle}>Seleccione un rubro</Text>
        <Picker
          onValueChange={(value) => setRubro(value?.toString())}
          selectedValue={reclamo.idRubro}
        >
          {rubros.map((rubro, index) => (
            <Picker.Item
              key={index}
              label={rubro.descripcion}
              value={rubro.idRubro}
            />
          ))}
        </Picker>
        <Text style={styles.subtitle}>Seleccione un desperfecto</Text>
        <Picker
          onValueChange={(value) => setDesperfecto(value?.toString())}
          selectedValue={reclamo.idRubro}
        >
          {desperfectos
            .filter((desperfecto) => desperfecto.idRubro === reclamo.idRubro)
            .map((desperfecto, index) => (
              <Picker.Item
                key={index}
                label={desperfecto.descripcion}
                value={desperfecto.idDesperfecto}
              />
            ))}
        </Picker>
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={setReason}
          placeholder="Motivo de la reclamo"
          style={styles.input}
          value={reclamo.descripcion}
        />
        <View
          darkColor="rgba(255,255,255,0.1)"
          lightColor="#eee"
          style={styles.separator}
        />
        <Text style={styles.imagenes}>Imagenes (MÁX. 7)</Text>
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
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
})
