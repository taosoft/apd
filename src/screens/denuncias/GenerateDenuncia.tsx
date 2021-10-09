import { noop } from '@babel/types'
import CheckBox from '@react-native-community/checkbox'
import * as React from 'react'
import { Alert, Button, Pressable, StyleSheet, TextInput } from 'react-native'

import { Text, View } from '../../components/Themed'

const handleTerminosCondiciones = (): void => {
  Alert.alert(
    'Términos y Condiciones',
    'En caso que la información provista sea falsa, podrá verse sometido a  acciones judiciales por parte del municipio y/o de los denunciados en su contra.',
    [{ style: 'cancel', text: 'CERRAR' }],
    { cancelable: false },
  )
}

export default function GenerateDenuncia(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar una Denuncia</Text>
      <TextInput
        // onChangeText={onChangeNumber}
        placeholder="useless placeholder"
        style={styles.input}
        // value={number}
      />
      <TextInput
        keyboardType="numeric"
        // onChangeText={onChangeNumber}
        placeholder="useless placeholder"
        style={styles.input}
        // value={number}
      />
      <TextInput
        keyboardType="numeric"
        // onChangeText={onChangeNumber}
        placeholder="useless placeholder"
        style={styles.input}
        // value={number}
      />
      <TextInput
        keyboardType="numeric"
        // onChangeText={onChangeNumber}
        placeholder="useless placeholder"
        style={styles.input}
        // value={number}
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
      <View style={styles.checkboxContainer}>
        <CheckBox
        //   onValueChange={setSelection}
        //   style={styles.checkbox}
        //   value={isSelected}
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
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  text: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
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
