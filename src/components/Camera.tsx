// import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export interface CameraPickerProps {
  nextRouteName: string
  //   addImage: () => void
  //   deleteImage: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CameraPicker(props: CameraPickerProps): JSX.Element {
  // const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  // const navigation = useNavigation()

  useEffect(() => {
    // ;(async () => {
    //   const { status } = await Camera.requestPermissionsAsync()
    //   setHasPermission(status === 'granted')
    //   navigation.goBack()
    // })()
  }, [])

  // if (hasPermission === null) {
  //   return <View />
  // }
  // if (hasPermission === false) {
  //   return <Text>No existe acceso a la cámara</Text>
  // }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              )
            }}
            style={styles.button}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flex: 0.1,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
})
