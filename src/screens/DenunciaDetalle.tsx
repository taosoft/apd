import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import ImageLayout from 'react-native-image-layout'

import useDenuncias from '../components/providers/useDenuncias'
import { DenunciaModelDetalle } from '../services/denuncia.service'

interface DenunciaDetalleProps {
  route: RouteProp<{ params: { id: number } }, 'params'>
}

export default function DenunciaDetalle({
  route,
}: DenunciaDetalleProps): JSX.Element {
  const { id } = route.params
  const { getDenuncia } = useDenuncias()

  const [denuncia, setDenuncia] = useState<DenunciaModelDetalle | undefined>(
    undefined,
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const imagenes =
    denuncia?.archivosURL?.split(';').map((image) => {
      return { uri: image }
    }) ?? []

  useEffect(() => {
    setIsLoading(true)
    getDenuncia(id).then((data) => {
      setDenuncia(data)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        {isLoading && (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator
              animating={true}
              color={'green'}
              size={'large'}
              style={styles.loadingIcon}
            />
          </View>
        )}
        {!isLoading && (
          <View>
            <Text style={styles.titleText}>
              Denuncia #{denuncia?.idDenuncia}
            </Text>
            <View style={styles.row}>
              <Text style={styles.titulo}>Estado:</Text>
              <Text style={styles.datos}>{denuncia?.estado}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titulo}>Denunciado:</Text>
              <Text style={styles.datos}>{denuncia?.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titulo}>Ubicacion:</Text>
              <Text style={styles.datos}>{denuncia?.sitio.calle}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.titulo}>Dirección:</Text>
              <Text style={styles.datos}>{denuncia?.address}</Text>
            </View>
            <Text style={styles.textSubBold}>Imagenes</Text>
            {imagenes.length === 0 && (
              <Text style={styles.alert}>No hay imágenes disponibles</Text>
            )}
            {imagenes.length !== 0 && <ImageLayout images={imagenes} />}
          </View>
        )}
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  loadingIcon: {
    left: '50%',
    position: 'relative',
    top: '70%',
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: '#409DC4',
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
  titulo: {
    color: '#409DC4',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },
})
