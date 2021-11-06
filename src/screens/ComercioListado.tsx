import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import ComercioItem from '../components/ComercioItem'
import { View } from '../components/Themed'
import { AuthNavigationScreenKey } from '../constants/NavigationKeys'

const DATA = [
  {
    foto: '',
    id: '1',
    texto: 'Tenemos todo lo que necesites',
    titulo: 'Ferretería Freire',
  },
  {
    foto: '',
    id: '2',
    texto: 'Abierto las 24hs',
    titulo: 'Farmacia La Danesa',
  },
]

interface ComercioListadoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function ComercioListado({
  route,
}: ComercioListadoProps): JSX.Element {
  const { authenticated } = route.params
  const navigation = useNavigation()
  const [text, setText] = React.useState('')

  return (
    <View style={styles.view}>
      <ScrollView keyboardShouldPersistTaps="always">
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
                navigation.navigate(AuthNavigationScreenKey.COMERCIOGENERAR)
              }}
            />
          )}
        </View>
        {/* Tincho: aca poner el listado de comercios. recordar q van con filtro  */}
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(AuthNavigationScreenKey.COMERCIODETALLE, {
                    id: item.id,
                  })
                }
              >
                <ComercioItem
                  foto={item.foto}
                  texto={item.texto}
                  titulo={item.titulo}
                />
              </TouchableOpacity>
            )
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
