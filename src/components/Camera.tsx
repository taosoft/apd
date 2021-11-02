import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { useCache } from './providers/useCache'

const WINDOW_HEIGHT = Dimensions.get('window').height
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08)

export default function CameraPicker(): JSX.Element {
  const cameraRef = useRef<Camera | null>()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const { changeCache } = useCache()
  const navigation = useNavigation()

  useEffect(() => {
    onHandlePermission()
  }, [])

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const switchCamera = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    )
  }

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7 }
      const data = await cameraRef.current.takePictureAsync(options)
      const source = data.uri

      if (source) {
        cameraRef.current.pausePreview()

        changeCache({
          addedPhoto: source,
        })
        navigation.goBack()
      }
    }
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No tiene acceso a la cámara</Text>
  }

  return (
    <View style={styles.container}>
      <Camera
        onCameraReady={onCameraReady}
        ref={(camera) => {
          cameraRef.current = camera
        }}
        style={styles.container}
        type={cameraType}
        useCamera2Api={true}
      />
      <View style={styles.container}>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
            <MaterialIcons color="white" name="flip-camera-ios" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={onSnap}
            style={styles.capture}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomButtonsContainer: {
    alignItems: 'center',
    bottom: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  capture: {
    backgroundColor: '#5A45FF',
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    height: CAPTURE_SIZE,
    marginBottom: 28,
    marginHorizontal: 30,
    width: CAPTURE_SIZE,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: '#fff',
  },
})
