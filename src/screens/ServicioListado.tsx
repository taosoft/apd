import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import useServicio from '../components/providers/useServicios'
import ServicioItem from '../components/ServicioItem'
import { View } from '../components/Themed'
import { ServicioModel } from '../services/servicios.service'

interface ServicioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ServicioListado({
  route,
}: ServicioListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()
  const { getServicios } = useServicio()
  const [text, setText] = useState('')
  const [isInspector] = useState(false)
  const [servicios, setServicios] = useState<ServicioModel[]>([])

  useEffect(() => {
    getServicios().then((res) => {
      setServicios(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.view}>
      <View style={styles.viewInline}>
        <TextInput
          autoCapitalize="none"
          defaultValue={text}
          onChangeText={(changedText) => setText(changedText)}
          onSubmitEditing={() => {
            // Como reaccionar cuando presiona el boton "submit" en el teclado
          }}
          placeholder="Buscar"
          placeholderTextColor="#D3D3D3"
          style={styles.textInput}
          underlineColorAndroid="transparent"
        />
        {authenticated && !isInspector && (
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
        data={servicios}
        keyExtractor={(item) => item.idServicio.toString()}
        renderItem={({ item }) => {
          return (
            /*
              Se supone que al hacer click, va a abrir el comercio con id = item.id
            */
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ServicioDetalle', { id: item.idServicio })
              }
            >
              <ServicioItem
                foto={item.archivosURL}
                texto={item.descripcion}
                titulo={item.nombreServicio}
              />
            </TouchableOpacity>
          )
        }}
        style={styles.flatList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 40,
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
    marginTop: 10,
  },
})
