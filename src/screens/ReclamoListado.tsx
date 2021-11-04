import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
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
import useReclamos from '../components/providers/useReclamos'
import { View } from '../components/Themed'
import { ReclamoModel } from '../services/reclamo.service'

interface ReclamoListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ReclamoListado({
  route,
}: ReclamoListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()
  const [text, setText] = React.useState('')

  const [reclamos, setReclamos] = useState<ReclamoModel[]>([])

  const { getReclamos } = useReclamos()

  useEffect(() => {
    getReclamos().then((array) => setReclamos(array))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.view}>
      <Text style={styles.sectionTitle}>Reclamos profesionales</Text>
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
        {authenticated && (
          <Button
            icon={<Icon color="white" name="plus" size={15} />}
            onPress={() => {
              navigation.navigate('ReclamoGenerar')
            }}
          />
        )}
      </View>
      {/* Tincho: aca poner el listado de Reclamos. recordar q van con filtro  */}
      <FlatList
        data={reclamos}
        keyExtractor={(item) => item.idReclamo.toString()}
        renderItem={({ item }) => {
          return (
            /*
              Se supone que al hacer click, va a abrir el comercio con id = item.id
            */
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReclamoDetalle', { id: item.idReclamo })
              }
            >
              <ListadoItem
                fecha={item.fecha.toString()}
                foto={undefined}
                titulo={item.documento}
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
