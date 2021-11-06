import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

export interface ComercioItemProps {
  fecha: string
  lugar: number
  numeroReclamo: number
}

export default function ComercioItem(props: ComercioItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.numeroReclamo}>
          {'Reclamo #' + props.numeroReclamo}
        </Text>
        <Text style={styles.fecha}>{props.fecha}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.lugar}>{props.lugar}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: 'lightgray',
    borderTopWidth: 2,
    paddingTop: 15,
  },
  fecha: {
    flex: 16,
    fontSize: 14,
  },
  lugar: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  numeroReclamo: {
    flex: 14,
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
})
