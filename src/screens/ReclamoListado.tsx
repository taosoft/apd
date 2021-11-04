import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import ListadoItem from '../components/ComercioItem'
import useReclamos from '../components/providers/useReclamos'
import { View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [reclamos, setReclamos] = useState<ReclamoModel[]>([])

  const { getReclamos } = useReclamos()

  useEffect(() => {
    setIsLoading(true)
    getReclamos().then((array) => {
      setReclamos(array)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // Tincho
    <View style={styles.view}>
      <View style={styles.viewInline}>
        <TextInput
          // Este componente obtiene el texto que se utilizara para filtrar los resultados
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
          // Poner boton para filtrar por Tipo
          // Poner boton para filtrar por Propia
          <Button
            icon={<Icon color="white" name="plus" size={15} />}
            onPress={() => {
              navigation.navigate(AuthNavigationScreenKey.RECLAMOGENERAR)
            }}
          />
        )}
      </View>
      {/* Tincho: aca poner el listado de Reclamos. recordar q van con filtro  */}
      {isLoading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator animating={true} color={'green'} size={'large'} />
        </View>
      )}
      {!isLoading && (
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
                  navigation.navigate(AuthNavigationScreenKey.RECLAMODETALLE, {
                    id: item.idReclamo,
                  })
                }
              >
                <ListadoItem
                  fecha={item.fecha.toString()}
                  foto={undefined}
                  titulo={"Reclamo #" + item.idReclamo.toString()}
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
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
    marginTop: 10,
  },
})
