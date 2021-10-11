import { noop } from '@babel/types'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as React from 'react'
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { Text } from './Themed'

export interface ImageContainerProps<T> {
  data: T[]
  readonly: boolean
  maxImages: number
  //   addImage: () => void
  //   deleteImage: () => void
}

// TODO: Cambiar por https://www.npmjs.com/package/react-native-raw-bottom-sheet
const handleImageProvider = (
  handleAddImage: (uri: string | undefined) => void,
): void => {
  Alert.alert(
    'Seleccionar una foto...',
    undefined,
    [
      {
        onPress: async () => handleAddImage(await handleImagePicker()),
        text: 'Tomar una foto',
      },
      {
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
        text: 'Cancelar',
      },
      { onPress: () => handleImagePicker(), text: 'Galería' },
    ],
    { cancelable: false },
  )
}

// const handleCamera = (): Promise<string | undefined> => {}

async function handleImagePicker(): Promise<string | undefined> {
  if (
    Platform.OS !== 'web' &&
    (await ImagePicker.getCameraPermissionsAsync()).status !==
      ImagePicker.PermissionStatus.GRANTED
  ) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Se necesitan permisos de cámara para adjuntar imágenes')
      return undefined
    }
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    // base64: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  })

  return !result.cancelled ? result.uri : undefined
}

export default function ImageContainer(
  props: ImageContainerProps<string>,
): JSX.Element {
  function handleAddImage(uri: string | undefined): void {
    console.log(uri)
  }

  if (props.data.length === 0 && props.readonly) {
    return (
      <View>
        <Text>No hay imágenes disponibles</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {props.data.map((image, index) => {
        return (
          <View key={index} style={styles.item}>
            <TouchableOpacity onPress={() => noop} style={styles.closeCircle}>
              <AntDesign color="grey" name="closecircle" size={24} />
            </TouchableOpacity>
            <Image
              source={{
                uri: image,
              }}
              style={styles.itemIcon}
            />
          </View>
        )
      })}
      {props.data.length < props.maxImages && !props.readonly && (
        <TouchableOpacity
          key={1}
          onPress={() => handleImageProvider(handleAddImage)}
          style={styles.item}
        >
          <AntDesign color="black" name="pluscircle" size={24} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  closeCircle: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
  },
  item: {
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 100,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.3,
  },
  itemIcon: {
    height: 100,
    resizeMode: 'stretch',
    width: Dimensions.get('window').width * 0.3,
  },
})
