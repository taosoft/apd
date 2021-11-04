import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import useReclamos from '../components/providers/useReclamos'

export default function ReclamoDetalle({ id }: number): JSX.Element {
  const { getReclamo } = useReclamos()
  const [reclamo, setReclamo] = useState([])

  useEffect(() => {
    getReclamo(id).then((data) => {
      console.log('reclamo')
      console.log(data)
      setReclamo(data)
    })
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.titleText}>Reclamo #1234567</Text>
          <Text style={styles.textSubBold}>Estado: Abierto</Text>
          <Text style={styles.text}>Autor: Juan Perez</Text>
          <Text style={styles.text}>Ubicacion: Calle Falsa 123</Text>
          <Text style={styles.text}>Rubro:</Text>
          <Text style={styles.text}>Tipo de desperfecto:</Text>
          <Text style={styles.text}>Texto que detalla la denuncia</Text>
          <Text style={styles.textSubBold}>Archivos</Text>
          <Text style={styles.text}>Input de archivos a definir</Text>
          <Text style={styles.textSubBold}>Imagenes</Text>

          <ImageLayout
            images={[
              // Version *3.0.0 update (or greater versions):
              // Can be used with different image object fieldnames.
              // Ex. source, source.uri, uri, URI, url, URL
              {
                uri: 'https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg',
              },
              // IMPORTANT: It is REQUIRED for LOCAL IMAGES
              // to include a dimensions field with the
              // actual width and height of the image or
              // it will throw an error.
              // { source: require("yourApp/image.png"),
              //     dimensions: { width: 1080, height: 1920 }
              // },
              // "width" & "height" is an alternative to the dimensions
              // field that will also be acceptable.
              // { source: require("yourApp/image.png"),
              //     width: 1080,
              //     height: 1920 },
              {
                source: {
                  uri: 'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg',
                },
              },
              {
                // Optional: Adding a dimensions field with
                // the actual width and height for REMOTE IMAGES
                // will help improve performance.
                dimensions: { height: 1920, width: 1080 },

                uri: 'https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg',
              },
              {
                URI: 'https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg',
                // Version *2.0.0 update (or greater versions):
                // Optional: Does not require an id for each
                // image object, but is for best practices and
                // can be better for performance with the API.
                id: 'blpccx4cn',
              },
              {
                url: 'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
              },
              {
                URL: 'https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg',
              },
            ]}
            // Version *5.7.0 update
            // onEndReached={() => {
            //     // add more images when scroll reaches end
            // }}
          />
          <Text style={styles.textSubBold}>
            Bitacora del estado del reclamo
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    borderColor: '#C9E9FC',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    width: 300,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  text: {
    color: '#409DC4',
    marginTop: 5,
    textAlign: 'left',
  },
  textDesc: {
    color: '#409DC4',
    fontSize: 13,
    marginTop: 5,
    textAlign: 'left',
  },
  textNomApe: {
    color: '#409DC4',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'left',
  },
  textRubro: {
    color: '#409DC4',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'left',
  },
  textSubBold: {
    color: '#409DC4',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  titlePosition: {
    alignSelf: 'flex-start',
    flex: 1,
    marginLeft: 30,
    position: 'relative',
  },
  titleText: {
    color: '#409DC4',
    fontFamily: 'sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
})
