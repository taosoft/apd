import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { RootStackParamList } from '../types'

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta pantalla no existe.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Volver al home!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: '#2e78b7',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
