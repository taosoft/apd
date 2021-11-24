import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-elements'

import useAuth from '../components/providers/useAuth'
import useReclamos from '../components/providers/useReclamos'
import ReclamoItem from '../components/ReclamoItem'
import { View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
import { ReclamoDetalleModel } from '../services/reclamo.service'

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
  const [propio, setPropio] = useState<boolean>(false)
  const [copiaReclamos, setCopiaReclamos] = useState<ReclamoDetalleModel[]>([])
  const [reclamos, setReclamos] = useState<ReclamoDetalleModel[]>([])
  const [reclamosFiltrados, setReclamosFiltrados] = useState<
    ReclamoDetalleModel[]
  >([])

  const { getReclamos } = useReclamos()
  const { documento } = useAuth()

  useEffect(() => {
    setIsLoading(true)
    getReclamos().then((array) => {
      setReclamos(array)
      setReclamosFiltrados(array)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtrarReclamosPropios = () => {
    setCopiaReclamos(reclamosFiltrados)
    if (!propio) {
      setReclamosFiltrados(
        reclamosFiltrados.filter((reclamo) => reclamo.documento === documento),
      )
    } else {
      setReclamosFiltrados(copiaReclamos)
    }
    setPropio(!propio)
  }

  const filtrarDatos = () => {
    if (!text) {
      setReclamosFiltrados([...reclamos])
    } else {
      setReclamosFiltrados(
        reclamos.filter((item) => {
          return item.idReclamo.toString().toLowerCase().includes(text)
        }),
      )
    }
  }

  return (
    // Tincho
    <View style={styles.view}>
      <View style={(styles.horizontal, styles.viewInline)}>
        <TextInput
          // Este componente obtiene el texto que se utilizara para filtrar los resultados
          autoCapitalize="none"
          defaultValue={text}
          maxLength={30}
          onChangeText={(changedText) => setText(changedText.toLowerCase())}
          onSubmitEditing={filtrarDatos}
          placeholder="Buscar por #"
          placeholderTextColor="#D3D3D3"
          style={styles.textInput}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          onPress={filtrarReclamosPropios}
          style={styles.botonOrdenado}
        >
          <Text style={{ color: 'white' }}>Propio</Text>
        </TouchableOpacity>
        {authenticated && (
          <Icon
            color="gray"
            iconStyle={styles.botonCreacionReclamo}
            name="plus"
            onPress={() => {
              navigation.navigate(AuthNavigationScreenKey.RECLAMOGENERAR)
            }}
            type="font-awesome"
          />
        )}
      </View>
      {isLoading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator
            animating={true}
            color={'white'}
            size={'large'}
            style={styles.loadingIcon}
          />
        </View>
      )}
      {!isLoading && (
        <FlatList
          data={reclamosFiltrados}
          keyExtractor={(item) => item.idReclamo.toString()}
          renderItem={({ item }) => {
            return (
              // Al hacer click, abre el reclamo que posee id = item.id
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(AuthNavigationScreenKey.RECLAMODETALLE, {
                    id: item.IdReclamoUnificado
                      ? item.IdReclamoUnificado
                      : item.idReclamo,
                    idSelected: item.idReclamo,
                  })
                }
              >
                <ReclamoItem
                  fecha={item.fecha.toString()}
                  lugar={item.sitio.descripcion}
                  numeroReclamo={item.idReclamo}
                />
              </TouchableOpacity>
            )
          }}
          style={styles.flatList}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  botonCreacionReclamo: {
    backgroundColor: 'white',
    marginRight: 15,
  },
  botonOrdenado: {
    backgroundColor: 'gray',
    borderRadius: 50,
    marginRight: 15,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flatList: {
    marginBottom: 40,
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
  textInput: {
    borderColor: '#D3D3D3',
    borderRadius: 5,
    borderWidth: 2,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 10,
    width: 240,
  },
  view: {
    backgroundColor: '#fff',
  },
  viewInline: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
  },
})
