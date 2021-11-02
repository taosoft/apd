import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
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

import { AuthNavigationScreenKey } from '../constants/NavigationKeys'
import { GenerateType } from './providers/useCache'
import { Text } from './Themed'

export interface ImageContainerProps<T> {
  data: T[]
  readonly: boolean
  maxImages: number
  generateType: GenerateType
  addImage: (uri: string) => void
  deleteImage: (index: number) => void
}

// TODO: Cambiar por https://www.npmjs.com/package/react-native-raw-bottom-sheet
const handleImageProvider = (
  handleAddImagePicker: (uri: string | undefined) => void,
  handleAddCameraImage: () => void,
): void => {
  Alert.alert(
    'Seleccionar una foto...',
    undefined,
    [
      {
        onPress: async () => handleAddCameraImage(),
        text: 'Tomar una foto',
      },
      {
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
        text: 'Cancelar',
      },
      {
        onPress: async () => handleAddImagePicker(await handleImagePicker()),
        text: 'Galería',
      },
    ],
    { cancelable: false },
  )
}

async function handleImagePicker(): Promise<string | undefined> {
  if (
    Platform.OS !== 'web' &&
    (await ImagePicker.getCameraPermissionsAsync()).status !==
      ImagePicker.PermissionStatus.GRANTED
  ) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Se necesitan permisos de cámara para tomar imágenes')
      return undefined
    }
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  })

  return !result.cancelled ? result.uri : undefined
}

export default function ImageContainer(
  props: ImageContainerProps<string>,
): JSX.Element {
  const navigation = useNavigation()

  function handleAddImagePicker(uri: string | undefined): void {
    if (uri) {
      props.addImage(uri)
    }
  }
  function handleAddCameraImage(): void {
    navigation.navigate(AuthNavigationScreenKey.CAMERA)
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
            <TouchableOpacity
              onPress={() => props.deleteImage(index)}
              style={styles.closeCircle}
            >
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
          onPress={() =>
            handleImageProvider(handleAddImagePicker, handleAddCameraImage)
          }
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
