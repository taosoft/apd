import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import ItemBitacora from '../components/ItemBitacora'
import useReclamos from '../components/providers/useReclamos'
import { ReclamoDetalleModel } from '../services/reclamo.service'

interface ReclamoDetalleProps {
  route: RouteProp<{ params: { id: number; idSelected: number } }, 'params'>
}

export default function ReclamoDetalle({
  route,
}: ReclamoDetalleProps): JSX.Element {
  const { id } = route.params
  const { idSelected } = route.params
  const { getReclamoDetalle } = useReclamos()

  const [reclamo, setReclamo] = useState<ReclamoDetalleModel | undefined>(
    undefined,
  )

  const imagenes =
    reclamo?.archivosURL?.split(';').map((image) => {
      return { uri: image }
    }) ?? []

  const itemsBitacora =
    reclamo?.bitacora?.split(';').map((item) => {
      return {
        fecha: '',
        icono: '',
        titulo: item,
      }
    }) ?? []

  console.log('reclamo id: ', idSelected)
  console.log('Reclamo id unificado ', reclamo?.IdReclamoUnificado)

  useEffect(() => {
    getReclamoDetalle(id).then((data) => {
      setReclamo(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Reclamo #{reclamo?.idReclamo} </Text>
            <Text style={styles.titleText2}>
              {' '}
              {reclamo?.idReclamo === idSelected
                ? ''
                : 'Unificado con su #' + idSelected}{' '}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Estado:</Text>
            <Text style={styles.datos}>{reclamo?.estado}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Autor:</Text>
            <Text style={styles.datos}>
              {reclamo?.user?.nombre} {reclamo?.user?.apellido}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Ubicacion:</Text>
            <Text style={styles.datos}>{reclamo?.sitio?.descripcion}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Tipo de desperfecto:</Text>
            <Text style={styles.datos}>
              {reclamo?.desperfecto?.descripcion}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Descripción:</Text>
            <Text style={styles.datos}>{reclamo?.descripcion}</Text>
          </View>

          <Text style={styles.textSubBold}>Archivos</Text>
          <View style={styles.row}>
            <Text style={styles.alert}>Input de archivos a definir</Text>
          </View>
          <Text style={styles.textSubBold}>Imagenes</Text>
          {imagenes.length === 0 && (
            <Text style={styles.alert}>No hay imágenes disponibles</Text>
          )}
          {imagenes.length !== 0 && <ImageLayout images={imagenes} />}
          <Text style={styles.textSubBold}>
            Bitácora del estado del reclamo
          </Text>
          {itemsBitacora.map((item, index) => (
            <ItemBitacora
              fecha={item.fecha}
              icono={item.icono}
              key={index}
              titulo={item.titulo}
            />
          ))}
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
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: '#000',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'left',
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
  titleText2: {
    color: '#409DC4',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 45,
    textAlign: 'left',
  },
  titulo: {
    color: '#409DC4',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },
})
