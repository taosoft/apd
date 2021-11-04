import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import ListadoItem from '../components/ListadoItem'
import { View } from '../components/Themed'

const DATA = [
  {
    fecha: '12/10/2021',
    foto: '',
    id: '1',
    titulo: 'Plomeria Cacho',
  },
  {
    fecha: '11/10/2021',
    foto: '',
    id: '2',
    titulo: 'Instalacion de Aire Acondicionado JuanCa',
  },
]

interface ServicioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ServicioListado({
  route,
}: ServicioListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()
  const [text, setText] = React.useState('')

  return (
    <View style={styles.view}>
      <Text style={styles.sectionTitle}>Servicios profesionales</Text>
      <View style={styles.viewInline}>
        <TextInput
          autoCapitalize="none"
          defaultValue={text}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => {
            // Como reaccionar cuando presiona el boton "submit" en el teclado
          }}
          placeholder="Buscar"
          placeholderTextColor="#D3D3D3"
          style={styles.textInput}
          underlineColorAndroid="transparent"
        />
        {authenticated && (
          <Button
            icon={<Icon color="white" name="plus" size={15} />}
            onPress={() => {
              navigation.navigate('ServicioGenerar')
            }}
          />
        )}
      </View>
      {/* Tincho: aca poner el listado de servicios. recordar q van con filtro  */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            /*
              Se supone que al hacer click, va a abrir el comercio con id = item.id
            */
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ServicioDetalle', { id: item.id })
              }
            >
              <ListadoItem
                fecha={item.fecha}
                foto={item.foto}
                titulo={item.titulo}
              />
            </TouchableOpacity>
          )
        }}
      />
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
