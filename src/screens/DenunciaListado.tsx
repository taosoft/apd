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
      <View style={(styles.horizontal, styles.viewInline)}>
        <TextInput
          // Este componente obtiene el texto que se utilizara para filtrar los resultados
          autoCapitalize="none"
          defaultValue={text}
          maxLength={30}
          onChangeText={(changedText) => setText(changedText)}
          onSubmitEditing={(changedText) => {
            // Como reaccionar cuando presiona el boton "submit" en el teclado
            setText(changedText.nativeEvent.text)
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
          <Text style={{ color: 'white' }}>Estado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // ordena segun el estado
          }}
          style={styles.botonOrdenado}
        >
          <Text style={{ color: 'white' }}>Fecha</Text>
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
          data={denuncias}
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
