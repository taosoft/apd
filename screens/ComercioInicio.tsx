import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';

export default function ComercioInicio({ navigation }) {

  const listado = [
    {
      comercio1: {
        nombre: "Comercio Nico",
        descripcion: "Descripcion"
      },
      comercio2: {
        nombre: "Comercio 2",
        descripcion: "Descripcion"
      },
      comercio3: {
        nombre: "Comercio 3",
        descripcion: "Descripcion"
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      </ScrollView>
    </SafeAreaView>
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