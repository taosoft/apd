import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

export interface ComercioItemProps {
  titulo: string
  texto: string
  foto?: string
}

export default function ComercioItem(props: ComercioItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <ListItem bottomDivider>
        <Avatar
          size="large"
          source={require('../../borrar-ImagenComercio.jpg')}
        />
        {
          // aca iria en realidad props.foto
        }
        <ListItem.Content>
          <ListItem.Title style={styles.titulo}>{props.titulo}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitulo}>
            {props.texto}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  cardButton: {
    borderRadius: 0,
    bottom: 0,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    position: 'relative',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  fecha: {
    color: '#000',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  subtitulo: {
    fontSize: 14,
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 7,
  },
})
