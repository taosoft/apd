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
    getDenuncias('12345678').then((array) => {
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
        <Button
          onPress={() => {
            // ordena segun el estado
          }}
          style={styles.typeButton}
          title="Estado"
        />
        <Button
          onPress={() => {
            // ordena segun la fecha
          }}
          style={styles.typeButton}
          title="Fecha"
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
                <DenunciaItem
                  descripcion={item.descripcion}
                  estado={item.estado}
                  fecha={item.fecha.toString()}
                  numeroDenuncia={item.idDenuncia}
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
    borderRadius: 5,
    borderWidth: 2,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 7,
    width: 147,
  },
  typeButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    marginRight: 15,
  },
  view: {
    backgroundColor: '#fff',
  },
  viewInline: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 15,
  },
})
