import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native'
import TextInput from 'react-native-input-validator'
import { TextInputMask } from 'react-native-masked-text'

import ImageContainer from '../components/ImageContainer'
import { GenerateType } from '../components/providers/useCache'
import useDenuncias from '../components/providers/useDenuncias'
import useSitio from '../components/providers/useSitios'
import { Button, Text, View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
import { SitioModel } from '../services/sitio.service'

const handleTerminosCondiciones = (): void => {
  Alert.alert(
    'Términos y Condiciones',
    'En caso que la información provista sea falsa, podrá verse sometido a acciones judiciales por parte del municipio y/o de los denunciados en su contra.',
    [{ style: 'cancel', text: 'CERRAR' }],
    { cancelable: false },
  )
}

export default function DenunciaGenerar(): JSX.Element {
  const {
    addCachedImage,
    addImage,
    cachedImage,
    removeImage,
    denuncia,
    submitDenuncia,
    setDenunciaAddress,
    setDenunciaDate,
    setDenunciaName,
    setDenunciaReason,
    setIsTermsAndConditions,
    setDocumentoDenunciado,
    setLugar,
    isTermsAndConditions,
  } = useDenuncias()

  const navigation = useNavigation()

  const { getSitios } = useSitio()
  const [sitios, setSitios] = useState<SitioModel[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    if (!isTermsAndConditions) {
      Alert.alert('Es necesario aceptar los términos y condiciones')
    } else {
      const response = await submitDenuncia()
      if (response) {
        navigation.navigate(AuthNavigationScreenKey.DENUNCIALISTADO)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getSitios().then((sitiosResponse) => setSitios(sitiosResponse))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    addCachedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedImage])

  useEffect(() => {
    if (
      denuncia.name !== '' &&
      denuncia.address !== '' &&
      denuncia.descripcion !== ''
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [denuncia.name, denuncia.address, denuncia.descripcion])

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
        <Text style={styles.subtitle}>Fecha y hora del hecho denunciado</Text>
        <TextInputMask
          onChangeText={(text) => {
            setDenunciaDate(text)
          }}
          options={{
            format: 'DD/MM/YYYY HH:mm',
          }}
          placeholder="DD/MM/YYYY HH:mm"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            marginBottom: 30,
            padding: 10,
            paddingHorizontal: 30,
            textAlign: 'center',
            width: 300,
          }}
          type={'datetime'}
          value={denuncia.date}
        />
        <TextInput
          onChangeText={setDenunciaName}
          placeholder="Nombre del vecino o comercio"
          style={styles.input}
          value={denuncia.name}
        />
        <TextInput
          onChangeText={setDocumentoDenunciado}
          placeholder="Documento del denunciado (si lo tuviese)"
          style={styles.input}
          type={'numeric'}
          value={denuncia.documentoDenunciado}
        />
        <Text style={styles.subtitle}>Seleccione un lugar</Text>
        <Picker
          onValueChange={(value) => setLugar(value?.toString())}
          selectedValue={denuncia.idSitio}
        >
          {sitios.map((sitio, index) => (
            <Picker.Item
              key={index}
              label={sitio.descripcion}
              value={sitio.idSitio}
            />
          ))}
        </Picker>
        <TextInput
          onChangeText={setDenunciaAddress}
          placeholder="Dirección del vecino o comercio"
          style={styles.input}
          value={denuncia.address}
        />
        <TextInput
          onChangeText={setDenunciaReason}
          placeholder="Motivo de la denuncia"
          style={styles.input}
          value={denuncia.descripcion}
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
            data={denuncia.images.map((image) => image ?? '')}
            deleteImage={deleteImage}
            generateType={GenerateType.DENUNCIA}
            maxImages={Infinity}
            readonly={false}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            onValueChange={setIsTermsAndConditions}
            //   style={styles.checkbox}
            value={denuncia.isTermsAndConditions}
          />
          <Text style={styles.label}>
            {'Acepta los '}
            <Pressable onPress={handleTerminosCondiciones}>
              <Text style={styles.text}>términos y condiciones</Text>
            </Pressable>
          </Text>
        </View>
        <Button
          isDisabled={isDisabled}
          isLoading={isLoading}
          onPress={handleSubmit}
          text="Enviar"
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
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
    fontSize: 18,
    height: 40,
    margin: 12,
    padding: 10,
  },
  label: {
    flexDirection: 'row',
    fontStyle: 'italic',
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
  text: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
})
