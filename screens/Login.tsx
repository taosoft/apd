import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Login(): JSX.Element {
  const navigator = useNavigation()
  const [dni, setDNI] = React.useState("");
  const [clave, setClave] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, flex: 3 }}>
        <TextInput
          style={styles.input}
          placeholder='Ingrese su DNI o Legajo'
          placeholderTextColor='#409DC4'
          value={dni}
          keyboardType='number-pad'
          textContentType='username'
          onChangeText={setDNI}
        />

        <TextInput
          style={styles.input}
          placeholder='Ingrese su clave'
          placeholderTextColor='#409DC4'
          value={clave}
          keyboardType='ascii-capable'
          textContentType='password'
          secureTextEntry={true}
          onChangeText={setClave}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert(dni + ' ' + clave)}
        >
          <Text style={styles.ingresar}>
            INGRESAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigator.navigate('AuthenticatedStack')}
        >
          <Text style={styles.sinUsuario}>
            Ingrese sin usuario
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'space-between',
    backgroundColor: '#409DC4',
  },
  ingresar: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sinUsuario: {
    width: 118,
    marginTop: 20,
    color: '#409DC4',
    textAlign: 'left',
    fontStyle: 'italic',
    borderBottomWidth: 1,
    borderColor: '#C9E9FC',
    marginLeft: 30,
  },
  input: {
    width: 300,
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C9E9FC',
    justifyContent: 'space-between',
    textAlign: 'center',
    color: '#000',
    fontStyle: 'italic'
  },
});