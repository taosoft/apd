import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import useServicio from '../components/providers/useServicios'
import { ServicioModelDetalle } from '../services/servicios.service'

interface ServicioDetalleProps {
  route: RouteProp<{ params: { id: number } }, 'params'>
}

export default function ServicioDetalle({
  route,
}: ServicioDetalleProps): JSX.Element {
  const { id } = route.params
  const { getServicioDetalle } = useServicio()
  const [servicio, setServicio] = useState<ServicioModelDetalle>()

  const imagenes =
    servicio?.archivosURL?.split(';').map((image) => {
      return { uri: image }
    }) ?? []

  const horario = () => {
    const arrTime = servicio?.horario.split(';')

    if (arrTime) {
      return `De ${arrTime[0]} hasta las ${arrTime[1]} hs`
    } else {
      return ''
    }
  }

  useEffect(() => {
    getServicioDetalle(id).then((res) => {
      setServicio(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.titleText}>{servicio?.nombreServicio}</Text>
          <View style={styles.row}>
            <Text style={styles.titulo}>Horario:</Text>
            <Text style={styles.datos}>{horario()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Nombre de contacto:</Text>
            <Text style={styles.datos}>{servicio?.nombrePersona}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Dirección:</Text>
            <Text style={styles.datos}>{servicio?.direccion}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Teléfono:</Text>
            <Text style={styles.datos}>{servicio?.telefono}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>E-mail:</Text>
            <Text style={styles.datos}>{servicio?.email}</Text>
          </View>
          <Text style={styles.textSubBold}>Rubro</Text>
          <Text style={styles.datosDescripcion}>
            {servicio?.rubro.descripcion}
          </Text>
          <Text style={styles.textSubBold}>Descripción</Text>
          <Text style={styles.datosDescripcion}>{servicio?.descripcion}</Text>
          <Text style={styles.textSubBold}>Imágenes</Text>
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
    color: '#000',
    flex: 1,
    fontSize: 19,
    paddingLeft: 5,
    paddingTop: 5,
    textAlign: 'justify',
  },
  datosDescripcion: {
    color: '#000',
    fontSize: 19,
    marginTop: 5,
    textAlign: 'justify',
  },
  row: {
    backgroundColor: '#FFF',
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
