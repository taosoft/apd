import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import ItemBitacora from '../components/ItemBitacora'
import useReclamos from '../components/providers/useReclamos'
import { ReclamoDetalleModel } from '../services/reclamo.service'

interface ReclamoDetalleProps {
  route: RouteProp<{ params: { id: number } }, 'params'>
}

export default function ReclamoDetalle({
  route,
}: ReclamoDetalleProps): JSX.Element {
  const { id } = route.params
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
          <Text style={styles.titleText}>Reclamo #{reclamo?.idReclamo}</Text>
          <Text style={styles.textSubBold}>Estado: {reclamo?.estado}</Text>
          <Text style={styles.text}>
            Autor: {reclamo?.user?.nombre} {reclamo?.user?.apellido}
          </Text>
          <Text style={styles.text}>
            Ubicación: {reclamo?.sitio?.descripcion}
          </Text>
          <Text style={styles.text}>
            Tipo de desperfecto: {reclamo?.desperfecto?.descripcion}
          </Text>
          <Text style={styles.text}>Descripción: {reclamo?.descripcion}</Text>
          <Text style={styles.textSubBold}>Archivos</Text>
          <Text style={styles.text}>Input de archivos a definir</Text>
          <Text style={styles.textSubBold}>Imágenes</Text>
          {imagenes.length === 0 && (
            <Text style={styles.text}>No hay imágenes disponibles</Text>
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
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  text: {
    color: '#409DC4',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'left',
  },
  textSubBold: {
    color: '#409DC4',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  titleText: {
    color: '#409DC4',
    fontFamily: 'sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
})
