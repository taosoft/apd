import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import useComercio from '../components/providers/useComercio'
import { ComercioModel } from '../services/comercio.service'

interface ComercioDetalleProps {
  route: RouteProp<{ params: { id: number } }, 'params'>
}

export default function ComercioDetalle({
  route,
}: ComercioDetalleProps): JSX.Element {
  const { id } = route.params
  const { getComercioDetalle } = useComercio()
  const [comercio, setComercio] = useState<ComercioModel>()

  const imagenes =
    comercio?.archivosURL?.split(';').map((image) => {
      return { uri: image }
    }) ?? []

  const horario = () => {
    const arrTime = comercio?.horario.split(';')

    if (arrTime) {
      return `De ${arrTime[0]} hasta las ${arrTime[1]} hs`
    } else {
      return ''
    }
  }

  useEffect(() => {
    getComercioDetalle(id).then((res) => {
      setComercio(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.titleText}>{comercio?.nombre}</Text>
          <View style={styles.row}>
            <Text style={styles.titulo}>Horario:</Text>
            <Text style={styles.datos}>{horario()}</Text>
          </View>
          <Text style={styles.textSubBold}>Descripcion</Text>
          <Text style={styles.datosDescripcion}>{comercio?.descripcion}</Text>
          <Text style={styles.textSubBold}>Imagenes</Text>
          {imagenes.length === 0 && (
            <Text style={styles.alert}>No hay imágenes disponibles</Text>
          )}
          {imagenes.length !== 0 && <ImageLayout images={imagenes} />}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  alert: {
    color: 'red',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  datos: {
    color: '#808080',
    flex: 1,
    fontSize: 19,
    paddingLeft: 5,
    paddingTop: 5,
    textAlign: 'justify',
  },
  datosDescripcion: {
    color: '#808080',
    fontSize: 19,
    marginTop: 5,
    textAlign: 'justify',
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textSubBold: {
    color: '#409DC4',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  titleText: {
    color: '#409DC4',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
  titulo: {
    color: '#409DC4',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },
})
