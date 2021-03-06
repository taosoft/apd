import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

export interface NotificacionItemProps {
  idReclamo: string
  imgUsuario: string
  fecha: string
  texto: string
  titulo: string
}

export default function NotificacionItem(
  props: NotificacionItemProps,
): JSX.Element {
  return (
    <View style={styles.container}>
      <ListItem bottomDivider>
        <Avatar rounded size="medium" source={{ uri: props.imgUsuario }} />
        <ListItem.Content>
          <ListItem.Title style={styles.titulo}>
            {props.titulo} #{props.idReclamo}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.descripcion}>
            {props.texto}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  descripcion: {
    color: '#808080',
    fontSize: 14,
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 7,
  },
})
