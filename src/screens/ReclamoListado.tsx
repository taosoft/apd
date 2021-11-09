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

import useReclamos from '../components/providers/useReclamos'
import ReclamoItem from '../components/ReclamoItem'
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
  const [propio, setPropio] = useState<boolean>(false)
  const [copiaReclamos, setCopiaReclamos] = useState<ReclamoModel[]>([])

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

  const filtrarReclamosPropios = () => {
    setCopiaReclamos(reclamos)
    if (!propio) {
      setReclamos(reclamos.filter((reclamo) => reclamo.documento === '123'))
    } else {
      setReclamos(copiaReclamos)
    }
    setPropio(!propio)
  }

  return (
    // Tincho
    <View style={styles.view}>
      <View style={(styles.horizontal, styles.viewInline)}>
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
        <TouchableOpacity
          onPress={() => {
            // ordena segun el estado
          }}
          style={styles.botonOrdenado}
        >
          <Text style={{ color: 'white' }}>Tipo</Text>
        </TouchableOpacity>
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
          data={reclamos}
          keyExtractor={(item) => item.idReclamo.toString()}
          renderItem={({ item }) => {
            return (
              // Al hacer click, abre el reclamo que posee id = item.id
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(AuthNavigationScreenKey.RECLAMODETALLE, {
                    id: item.idReclamo,
                  })
                }
              >
                <ReclamoItem
                  fecha={item.fecha.toString()}
                  lugar={item.idSitio}
                  numeroReclamo={item.idReclamo}
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
    width: 150,
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
