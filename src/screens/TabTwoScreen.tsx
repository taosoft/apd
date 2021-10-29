import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'

import NotificacionItem from '../components/NotificacionItem'
import { View } from '../components/Themed'

const DATA = [
  {
    fecha: '12/10/2021',
    id: '1',
    imgUsuario: '',
    texto: 'Nuevo estado de la denuncia #1234',
    titulo: 'Denuncia',
  },
  {
    fecha: '11/10/2021',
    id: '2',
    imgUsuario: '',
    texto: 'Nuevo reclamo generado #5678',
    titulo: 'Reclamo',
  },
]

interface NotificacionesListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function TabTwoScreen({
  route,
}: NotificacionesListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()

  return (
    <View style={styles.view}>
      <Text style={styles.sectionTitle}>Notificaciones</Text>
      {authenticated && (
        /* Tincho: Listado de notificaciones  */
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            /* Aca tendria q validar si es un reclamo, denuncia, etc para saber q tipo de componente navegar */
            return (
              /*
                  Se supone que al hacer click, va a abrir la notificacion correspondiente (reclamo, denuncia, etc) con id = item.id
                */
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
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 30,
    margin: 15,
  },
  textInput: {
    borderColor: '#D3D3D3',
    borderRadius: 0,
    borderWidth: 1,
    marginLeft: 15,
    paddingLeft: 15,
    paddingRight: 15,
    width: 315,
  },
  view: {
    backgroundColor: '#fff',
  },
  viewInline: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
})
