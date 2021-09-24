import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

export default function Denuncia({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, flex: 3 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Consulta Denuncias')}
        >
          <Text style={styles.text}>
            Consultar Denuncias
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Generar Denuncia")}>
          <Text style={styles.text}>
            Generar Denuncia
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
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C9E9FC',
    justifyContent: 'space-between',
  },
  text: {
    color: '#409DC4',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});