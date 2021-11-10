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
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.numeroReclamo}>
          {'Denuncia #' + props.numeroDenuncia}
        </Text>
        <Text style={styles.fecha}>{props.fecha}</Text>
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
    flex: 3,
    fontSize: 14,
    fontWeight: 'bold',
  },
  estado: {
    flex: 1,
    fontSize: 14,
  },
  fecha: {
    flex: 1,
    fontSize: 14,
  },
  numeroReclamo: {
    flex: 1,
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
