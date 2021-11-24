import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import ComercioItem from '../components/ComercioItem'
import useComercio from '../components/providers/useComercio'
import { View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
import { ComercioModel } from '../services/comercio.service'

interface ComercioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ComercioListado({
  route,
}: ComercioListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()
  const { getComercios } = useComercio()
  const [text, setText] = React.useState('')
  const [isInspector] = React.useState(false)
  const [comercios, setComercios] = useState<ComercioModel[]>([])

  useEffect(() => {
    getComercios().then((res) => {
      setComercios(res)
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
              navigation.navigate(AuthNavigationScreenKey.COMERCIOGENERAR)
            }}
          />
        )}
      </View>
      {/* Tincho: aca poner el listado de comercios. recordar q van con filtro  */}
      <FlatList
        data={comercios}
        keyExtractor={(item) => item.idComercio.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(AuthNavigationScreenKey.COMERCIODETALLE, {
                  id: item.idComercio,
                })
              }
            >
              <ComercioItem
                foto={item.archivosURL.split(';').shift()}
                texto={item.descripcion}
                titulo={item.nombre}
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
