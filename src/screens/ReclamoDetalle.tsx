import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import ItemBitacora from '../components/ItemBitacora'
import useDesperfecto from '../components/providers/useDesperfecto'
import useReclamos from '../components/providers/useReclamos'
import useSitio from '../components/providers/useSitios'
import useUser from '../components/providers/useUser'
import { DesperfectoModel } from '../services/desperfecto.service'
import { ReclamoModel } from '../services/reclamo.service'
import { SitioModel } from '../services/sitio.service'
import { UserModel } from '../services/user.service'

interface ReclamoDetalleProps {
  route: RouteProp<{ params: { id: number } }, 'params'>
}

export default function ReclamoDetalle({
  route,
}: ReclamoDetalleProps): JSX.Element {
  const { id } = route.params
  const { getReclamo } = useReclamos()
  const { getSitio } = useSitio()
  const { getUser } = useUser()
  const { getDesperfecto } = useDesperfecto()

  const [reclamo, setReclamo] = useState<ReclamoModel | undefined>(undefined)
  const [sitio, setSitio] = useState<SitioModel>()
  const [user, setUser] = useState<UserModel>()
  const [desperfecto, setDesperfecto] = useState<DesperfectoModel>()

  const imagenes =
    reclamo?.archivosURL.split(';').map((image) => {
      return { uri: image }
    }) ?? []

  const itemsBitacora =
    reclamo?.bitacora.split(';').map((item) => {
      return {
        fecha: '',
        icono: '',
        titulo: item,
      }
    }) ?? []

  useEffect(() => {
    getReclamo(id).then((data) => {
      setReclamo(data)
      getUser(data.documento).then((usuario) => {
        setUser(usuario)
      })
      getSitio(data.idSitio).then((sitioData) => {
        setSitio(sitioData)
      })
      getDesperfecto(data.idDesperfecto).then((desperfectoData) => {
        setDesperfecto(desperfectoData)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(imagenes)

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.titleText}>Reclamo #{reclamo?.idReclamo}</Text>
          <Text style={styles.textSubBold}>Estado: {reclamo?.estado}</Text>
          <Text style={styles.text}>
            Autor: {user?.nombre} {user?.apellido}
          </Text>
          <Text style={styles.text}>Ubicacion: {sitio?.descripcion}</Text>
          <Text style={styles.text}>
            Tipo de desperfecto: {desperfecto?.descripcion}
          </Text>
          <Text style={styles.text}>Descripción: {reclamo?.descripcion}</Text>
          <Text style={styles.textSubBold}>Archivos</Text>
          <Text style={styles.text}>Input de archivos a definir</Text>
          <Text style={styles.textSubBold}>Imagenes</Text>
          {imagenes.length === 0 && (
            <Text style={styles.text}>No hay imágenes disponibles</Text>
          )}
          {imagenes.length !== 0 && <ImageLayout images={imagenes} />}
          <Text style={styles.textSubBold}>
            Bitacora del estado del reclamo
          </Text>
          <FlatList
            data={itemsBitacora}
            keyExtractor={(item) => item.titulo}
            renderItem={({ item, index }) => (
              <ItemBitacora
                fecha={item.fecha}
                icono={item.icono}
                key={index}
                titulo={item.titulo}
              />
            )}
          />
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
