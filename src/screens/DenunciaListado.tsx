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
import useDenuncias from '../components/providers/useDenuncias'
import { View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
import { DenunciaModel } from '../services/denuncia.service'

interface DenunciaListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function DenunciaListado({
  route,
}: DenunciaListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()
  const [text, setText] = React.useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [denuncias, setDenuncias] = useState<DenunciaModel[]>([])

  const { getDenuncias } = useDenuncias()

  useEffect(() => {
    setIsLoading(true)
    getDenuncias().then((array) => {
      setDenuncias(array)
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
          // Poner boton para filtrar por Estado
          // Poner boton para filtrar por Fecha
          <Button
            icon={<Icon color="white" name="plus" size={15} />}
            onPress={() => {
              navigation.navigate(AuthNavigationScreenKey.DENUNCIAGENERAR)
            }}
          />
        )}
      </View>
      {isLoading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator
            animating={true}
            color={'green'}
            size={'large'}
            style={styles.loadingIcon}
          />
        </View>
      )}
      {!isLoading && (
        <FlatList
          data={denuncias}
          keyExtractor={(item) => item.idDenuncia.toString()}
          renderItem={({ item }) => {
            return (
              // Al hacer click, abre el reclamo que posee id = item.id
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(AuthNavigationScreenKey.DENUNCIADETALLE, {
                    id: item.idDenuncia,
                  })
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
  loadingIcon: {
    left: '50%',
    position: 'relative',
    top: '70%',
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
