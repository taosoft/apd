import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import NotificacionItem from '../components/NotificacionItem'
import useAuth from '../components/providers/useAuth'
import useNotificaciones from '../components/providers/useNotificaciones'
import { View } from '../components/Themed'
import { NotificacionesModel } from '../services/notificaciones.service'

// const DATA = [
//   {
//     fecha: '12/10/2021',
//     id: '1',
//     imgUsuario:
//       'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//     texto: 'Nuevo estado de la denuncia #1234',
//     titulo: 'Denuncia',
//   },
//   {
//     fecha: '11/10/2021',
//     id: '2',
//     imgUsuario:
//       'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//     texto: 'Nuevo reclamo generado #5678',
//     titulo: 'Reclamo',
//   },
// ]

interface NotificacionesListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function Notificaciones({
  route,
}: NotificacionesListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()
  const { documento } = useAuth()
  const { getNotificaciones, updateNotificaciones } = useNotificaciones()
  const [items, setItems] = useState<NotificacionesModel[]>([])

  useEffect(() => {
    getNotificaciones(documento).then((res) => {
      setItems(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateAndOpenDenunciaDetails = async (
    idDenuncia: string,
    idNotificacion: string,
  ) => {
    const response = await updateNotificaciones(idNotificacion)
    if (response) {
      navigation.navigate('DenunciaDetalle', { id: idDenuncia })
    } else {
      Alert.alert('No se pudo abrir la denuncia')
    }
  }

  const updateAndOpenReclamoDetails = async (
    idReclamo: string,
    idNotificacion: string,
  ) => {
    console.log(idNotificacion)
    const response = await updateNotificaciones(idNotificacion)
    if (response) {
      navigation.navigate('ReclamoDetalle', { id: idReclamo })
    } else {
      Alert.alert('No se pudo abrir el reclamo')
    }
  }

  return (
    <View style={styles.view}>
      {authenticated && (
        /* Tincho: Listado de notificaciones  */
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            // Validar que tipo de componente es (para saber hacia que tipo de componente va a navegar luego)
            if (item.titulo.includes('Denuncia')) {
              return (
                // Al hacer click, abre el reclamo que posea id = item.id
                <TouchableOpacity
                  onPress={() =>
                    updateAndOpenDenunciaDetails(item.id, item.idNotificacion)
                  }
                >
                  <NotificacionItem
                    fecha={item.fecha}
                    imgUsuario={item.imgUsuario}
                    texto={'Nuevo estado: ' + item.texto}
                    titulo={item.titulo}
                  />
                </TouchableOpacity>
              )
            } else if (item.titulo.includes('Reclamo')) {
              return (
                // Al hacer click, abre el reclamo que posea id = item.id
                <TouchableOpacity
                  onPress={() =>
                    updateAndOpenReclamoDetails(item.id, item.idNotificacion)
                  }
                >
                  <NotificacionItem
                    fecha={item.fecha}
                    imgUsuario={item.imgUsuario}
                    texto={'Nuevo estado: ' + item.texto}
                    titulo={item.titulo}
                  />
                </TouchableOpacity>
              )
            } else {
              return (
                <Text>Usted no posee ninguna notificación de momento.</Text>
              )
            }
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    marginTop: 40,
  },
})
