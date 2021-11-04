import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export interface ListadoItemProps {
  titulo: string
  fecha: string
  foto?: string
}

export default function ListadoItem(props: ListadoItemProps): JSX.Element {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Card containerStyle={{ width: Dimensions.get('window').width - 30 }}>
        <Card.Title>{props.titulo}</Card.Title>
        <Card.Divider />
        <Card.Image
          source={require('../../borrar-ImagenComercio.jpg')} // aca iria en realidad props.foto
          style={styles.foto}
        />
        <Button
          icon={<Icon color="white" name="plus" size={20} />}
          onPress={() => {
            navigation.navigate('ComercioDetalle')
          }}
          style={styles.cardButton}
          title=" Ver más"
        />
        <Text style={styles.fecha}>Fecha de publicación: {props.fecha}</Text>
      </Card>
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
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  fecha: {
    color: '#000',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  foto: {
    width: '100%',
  },
})
