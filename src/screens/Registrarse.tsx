/* eslint-disable react-native/no-inline-styles */
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Registrarse(): JSX.Element {
  const [dni, setDNI] = React.useState('')
  const [email, setEmail] = React.useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nroTramiteDNI, setNroTramiteDNI] = React.useState('')
  const [municipio, setMunicipio] = React.useState('nico')

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginTop: 40 }}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={setDNI}
          placeholder="Ingrese su DNI"
          placeholderTextColor="#409DC4"
          style={styles.input}
          textContentType="username"
          value={dni}
        />

        <TextInput
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Ingrese su email"
          placeholderTextColor="#409DC4"
          style={styles.input}
          textContentType="emailAddress"
          value={email}
        />
        <Picker
          mode="dialog"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onValueChange={(itemValue, itemIndex) => setMunicipio(itemValue)}
          selectedValue={municipio}
          style={styles.municipio}
        >
          <Picker.Item label="Nico" value="nico" />
          <Picker.Item label="San Isidro" value="isidro" />
        </Picker>

        <TouchableOpacity
          onPress={() => Alert.alert(dni + ' ' + email + ' ' + municipio)}
          style={styles.button}
        >
          <Text style={styles.registrarse}>REGISTRARSE</Text>
        </TouchableOpacity>

        <Text style={styles.condicion}>
          Deberá pertenecer al municipio seleccionado
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#409DC4',
    borderColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    width: 300,
  },
  condicion: {
    borderBottomWidth: 1,
    borderColor: '#C9E9FC',
    color: '#409DC4',
    fontStyle: 'italic',
    marginLeft: 30,
    marginTop: 20,
    textAlign: 'left',
    width: 277,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#000',
    fontStyle: 'italic',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
    width: 300,
  },
  municipio: {
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    color: '#409DC4',
    fontStyle: 'italic',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    width: 300,
  },
  registrarse: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
