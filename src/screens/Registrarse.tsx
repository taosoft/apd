/* eslint-disable react-native/no-inline-styles */
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

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginTop: 40 }}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={setDNI}
          placeholder="Ingrese su Documento"
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

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Su solicitud ha sido enviada al municipio para su evaluación',
            )
          }
          style={styles.button}
        >
          <Text style={styles.registrarse}>REGISTRARSE</Text>
        </TouchableOpacity>
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
    fontSize: 18,
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
    fontSize: 18,
  },
})
