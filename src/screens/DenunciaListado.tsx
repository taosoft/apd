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

import DenunciaItem from '../components/DenunciaItem'
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
  const [denunciasFiltradasTexto, setDenunciasFiltradasTexto] = useState<
    DenunciaModel[]
  >([])
  const [estado, setEstado] = useState<boolean>(false)
  const [fecha, setFecha] = useState<boolean>(false)

  const { getDenuncias } = useDenuncias()

  useEffect(() => {
    setIsLoading(true)
    getDenuncias().then((array) => {
      setDenuncias(array)
      setDenunciasFiltradasTexto(array)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtrarDatosTexto = () => {
    if (!text) {
      setDenunciasFiltradasTexto([...denuncias])
    } else {
      setDenunciasFiltradasTexto(
        denuncias.filter((item) => {
          return item.idDenuncia.toString().toLowerCase().includes(text)
        }),
      )
    }
  }

  const ordenarPorEstado = () => {
    setEstado(!estado)
    if (estado) {
      setDenunciasFiltradasTexto(
        denunciasFiltradasTexto.sort((a, b) => (a.estado >= b.estado ? 1 : 0)),
      )
    } else {
      setDenunciasFiltradasTexto(
        denunciasFiltradasTexto.sort((a, b) =>
          a.idDenuncia > b.idDenuncia ? 1 : 0,
        ),
      )
    }
  }

  const ordenarPorFecha = () => {
    setFecha(!fecha)
    if (fecha) {
      setDenunciasFiltradasTexto(
        denunciasFiltradasTexto.sort((a, b) =>
          a.fechaDenuncia > b.fechaDenuncia
            ? 1
            : b.fechaDenuncia > a.fechaDenuncia
            ? -1
            : 0,
        ),
      )
    } else {
      setDenunciasFiltradasTexto(
        denunciasFiltradasTexto.sort((a, b) =>
          a.idDenuncia > b.idDenuncia ? 1 : 0,
        ),
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
          onSubmitEditing={filtrarDatosTexto}
          placeholder="Buscar"
          placeholderTextColor="#D3D3D3"
          style={styles.textInput}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          onPress={ordenarPorEstado}
          style={ estado ? styles.botonOrdenado : styles.botonOrdenadoOnPress}
        >
          <Text style={ estado ? { color: 'white' } : { color: 'black' }}>Estado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ordenarPorFecha}
          style={ fecha ? styles.botonOrdenado : styles.botonOrdenadoOnPress}
        >
          <Text style={ fecha ? { color: 'white' } : { color: 'black' }}>Fecha</Text>
        </TouchableOpacity>
        {authenticated && (
          <Icon
            color="gray"
            iconStyle={styles.botonCreacionDenuncia}
            name="plus"
            onPress={() => {
              navigation.navigate(AuthNavigationScreenKey.DENUNCIAGENERAR)
            }}
            type="font-awesome"
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
          data={denunciasFiltradasTexto}
          keyExtractor={(item) => item.idDenuncia.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(AuthNavigationScreenKey.DENUNCIADETALLE, {
                    id: item.idDenuncia,
                  })
                }
              >
                <DenunciaItem
                  descripcion={item.descripcion}
                  estado={item.estado}
                  fecha={item.fechaDenuncia?.toString()}
                  numeroDenuncia={item.idDenuncia}
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
  botonCreacionDenuncia: {
    backgroundColor: 'white',
    marginRight: 15,
  },
  botonOrdenadoOnPress: {
    backgroundColor: 'aqua',
    borderRadius: 50,
    marginRight: 15,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
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
