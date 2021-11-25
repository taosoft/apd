import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
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
import { useBadge } from '../components/providers/useNotificationBadge'
import { View } from '../components/Themed'
import { NotificacionesModel } from '../services/notificaciones.service'
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
  const loaded = useIsFocused()
  const { changeCounter } = useBadge()

  useEffect(() => {
    getNotificaciones(documento).then((res) => {
      setItems(res)
      changeCounter(res.length)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])

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
            if (item.titulo.includes('Denuncia')) {
              return (
                <TouchableOpacity
                  onPress={() =>
                    updateAndOpenDenunciaDetails(item.id, item.idNotificacion)
                  }
                >
                  <NotificacionItem
                    fecha={item.fecha}
                    idReclamo={item.id}
                    imgUsuario={item.imgUsuario}
                    texto={'Nuevo estado: ' + item.texto}
                    titulo={item.titulo}
                  />
                </TouchableOpacity>
              )
            } else if (item.titulo.includes('Reclamo')) {
              return (
                <TouchableOpacity
                  onPress={() =>
                    updateAndOpenReclamoDetails(item.id, item.idNotificacion)
                  }
                >
                  <NotificacionItem
                    fecha={item.fecha}
                    idReclamo={item.id}
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
