import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

export interface DenunciaItemProps {
  descripcion: string
  estado: string
  fecha: string
  numeroDenuncia: number
}

export default function DenunciaItem(props: DenunciaItemProps): JSX.Element {
  const fecha = moment(props.fecha).format('L')
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.numeroReclamo}>
          {'Denuncia #' + props.numeroDenuncia}
        </Text>
        <Text style={styles.fecha}>{fecha}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.descripcion}>{props.descripcion.slice(0, 30)}</Text>
        <Text style={styles.estado}>{props.estado}</Text>
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
  descripcion: {
    color: '#808080',
    flex: 3,
    fontSize: 14,
    fontWeight: 'bold',
  },
  estado: {
    color: '#808080',
    flex: 1,
    fontSize: 14,
  },
  fecha: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
  numeroReclamo: {
    flex: 1,
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
