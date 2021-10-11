import { noop } from '@babel/types'
import CheckBox from '@react-native-community/checkbox'
import * as React from 'react'
import { Alert, Button, Pressable, StyleSheet, TextInput } from 'react-native'

import ImageContainer from '../components/ImageContainer'
import { Text, View } from '../components/Themed'

const handleTerminosCondiciones = (): void => {
  Alert.alert(
    'Términos y Condiciones',
    'En caso que la información provista sea falsa, podrá verse sometido a  acciones judiciales por parte del municipio y/o de los denunciados en su contra.',
    [{ style: 'cancel', text: 'CERRAR' }],
    { cancelable: false },
  )
}

export default function DenunciaGenerar(): JSX.Element {
  const [denunciaDate, setDenunciaDate] = React.useState<string>('')
  const [denunciaName, setDenunciaName] = React.useState<string>('')
  const [denunciaAddress, setDenunciaAddress] = React.useState<string>('')
  const [denunciaReason, setDenunciaReason] = React.useState<string>('')
  const [isTermsAndConditions, setIsTermsAndConditions] =
    React.useState<boolean>(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar una Denuncia</Text>
      <TextInput
        onChangeText={setDenunciaDate}
        placeholder="Fecha y hora del hecho denunciado"
        style={styles.input}
        value={denunciaDate}
      />
      <TextInput
        onChangeText={setDenunciaName}
        placeholder="Nombre del vecino o comercio"
        style={styles.input}
        value={denunciaName}
      />
      <TextInput
        onChangeText={setDenunciaAddress}
        placeholder="Dirección del vecino o comercio"
        style={styles.input}
        value={denunciaAddress}
      />
      <TextInput
        onChangeText={setDenunciaReason}
        placeholder="Motivo de la denuncia"
        style={styles.input}
        value={denunciaReason}
      />
      <Pressable
        onPress={handleTerminosCondiciones}
        // style={({ pressed }) => [
        //   {
        //     backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        //   },
        //   styles.wrapperCustom,
        // ]}
      >
        <Text style={styles.text}>Adjuntar archivos</Text>
      </Pressable>
      <Text style={styles.imagenes}>Imagenes</Text>
      <View
        darkColor="rgba(255,255,255,0.1)"
        lightColor="#eee"
        style={styles.separator}
      />
      <View>
        <ImageContainer
          data={[
            'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
            'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
            'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
            'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
            'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
            'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
          ]}
          maxImages={7}
          readonly={false}
        />
      </View>
      <View
        darkColor="rgba(255,255,255,0.1)"
        lightColor="#eee"
        style={styles.separator}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          onValueChange={setIsTermsAndConditions}
          //   style={styles.checkbox}
          value={isTermsAndConditions}
        />
        <Text style={styles.label}>
          {'Acepta los '}
          <Pressable
            onPress={handleTerminosCondiciones}
            // style={({ pressed }) => [
            //   {
            //     backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            //   },
            //   styles.wrapperCustom,
            // ]}
          >
            <Text style={styles.text}>términos y condiciones</Text>
          </Pressable>
        </Text>
      </View>
      <Button color={'black'} onPress={noop} title={'Enviar'} />
      <View
        darkColor="rgba(255,255,255,0.1)"
        lightColor="#eee"
        style={styles.separator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  checkbox: {
    alignSelf: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
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
    height: 40,
    margin: 12,
    padding: 10,
  },

  label: {
    fontStyle: 'italic',
    margin: 8,
  },

  logBox: {
    backgroundColor: '#f9f9f9',
    borderColor: '#f0f0f0',
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    padding: 20,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },

  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  text: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
})
