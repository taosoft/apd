import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

export interface ComercioItemProps {
  fecha: string
  lugar: string
  numeroReclamo: number
}

export default function ComercioItem(props: ComercioItemProps): JSX.Element {
  const fecha = moment(props.fecha).format('L')
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.numeroReclamo}>
          {'Reclamo #' + props.numeroReclamo}
        </Text>
        <Text style={styles.fecha}>{fecha}</Text>
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
    textAlign: 'right',
  },
  lugar: {
    color: '#808080',
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  numeroReclamo: {
    flex: 14,
    fontSize: 19,
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
