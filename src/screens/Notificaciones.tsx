import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'

import NotificacionItem from '../components/NotificacionItem'
import { View } from '../components/Themed'

const DATA = [
  {
    fecha: '12/10/2021',
    id: '1',
    imgUsuario:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    texto: 'Nuevo estado de la denuncia #1234',
    titulo: 'Denuncia',
  },
  {
    fecha: '11/10/2021',
    id: '2',
    imgUsuario:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    texto: 'Nuevo reclamo generado #5678',
    titulo: 'Reclamo',
  },
]

interface NotificacionesListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function Notificaciones({
  route,
}: NotificacionesListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()

  return (
    <View style={styles.view}>
      {authenticated && (
        /* Tincho: Listado de notificaciones  */
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            // Validar que tipo de componente es (para saber hacia que tipo de componente va a navegar luego)
            if (item.titulo.includes('Denuncia')) {
              return (
                // Al hacer click, abre el reclamo que posea id = item.id
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DenunciaDetalle', { id: item.id })
                  }
                >
                  <NotificacionItem
                    fecha={item.fecha}
                    imgUsuario={item.imgUsuario}
                    texto={item.texto}
                    titulo={item.titulo}
                  />
                </TouchableOpacity>
              )
            } else if (item.titulo.includes('Reclamo')) {
              return (
                // Al hacer click, abre el reclamo que posea id = item.id
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ReclamoDetalle', { id: item.id })
                  }
                >
                  <NotificacionItem
                    fecha={item.fecha}
                    imgUsuario={item.imgUsuario}
                    texto={item.texto}
                    titulo={item.titulo}
                  />
                </TouchableOpacity>
              )
            } else {
              return (
                <Text>Usted no posee ninguna notificacion de momento.</Text>
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
