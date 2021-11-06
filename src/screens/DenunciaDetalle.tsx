import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import ItemBitacora from '../components/ItemBitacora'

export default function DenunciaDetalle(): JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.titleText}>Denuncia #1234567</Text>
          <Text style={styles.textSubBold}>Estado: Abierto</Text>
          <Text style={styles.text}>Denunciado: Juan Perez</Text>
          <Text style={styles.text}>Ubicacion: Calle Falsa 123</Text>
          <Text style={styles.text}>Motivo de la denuncia:</Text>
          <Text style={styles.textSubBold}>Archivos</Text>
          <Text style={styles.text}>Input de archivos a definir</Text>
          <Text style={styles.textSubBold}>Imagenes</Text>

          <ImageLayout
            images={[
              // Version *3.0.0 update (or greater versions):
              // Can be used with different image object fieldnames.
              // Ex. source, source.uri, uri, URI, url, URL
              {
                uri: 'https://www.olavarria.gov.ar/wp-content/uploads/2017/12/Plaza-Julio-Pagano-B%C2%BA-Bancario-1-1024x683.jpg',
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
                  uri: 'https://www.pergamino.gob.ar/wp-content/uploads/2019/09/juegos-Plaza-Da%CC%81vila-7-1024x682.jpeg',
                },
              },
              {
                // Optional: Adding a dimensions field with
                // the actual width and height for REMOTE IMAGES
                // will help improve performance.
                dimensions: { height: 1920, width: 1080 },

                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Plaza_25_de_Mayo_Rosario_2.jpg/1200px-Plaza_25_de_Mayo_Rosario_2.jpg',
              },
              {
                URI: 'https://www.msm.gov.ar/wp-content/uploads/2014/12/PLAZA-TRUJUI.jpg',
                // Version *2.0.0 update (or greater versions):
                // Optional: Does not require an id for each
                // image object, but is for best practices and
                // can be better for performance with the API.
                id: 'blpccx4cn',
              },
              {
                url: 'https://greatruns.com/wp-content/uploads/2017/05/plaza-holanda.jpg',
              },
              {
                URL: 'https://www.welcomeargentina.com/paseos/plazas_mendoza/plazas_mendoza-2.jpg',
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
          <FlatList
            data={[
              {
                fecha: '',
                icono: '',
                titulo: 'Denuncia creada el 4 de noviembre de 2021 11:09 hs',
              },
              {
                fecha: '',
                icono: '',
                titulo:
                  'La Denuncia cambio a En Proceso el 4 de noviembre de 2021 12:09 hs',
              },
              {
                fecha: ' ',
                icono: '',
                titulo:
                  'La Denuncia cambio a Finalizado el 4 de noviembre de 2021 14:09 hs',
              },
            ]}
            renderItem={({ item }) => (
              <ItemBitacora
                fecha={item.fecha}
                icono={item.icono}
                titulo={item.titulo}
              />
            )}
          />
          {/* <Text style={styles.item}>{item.key}</Text> */}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
  textSubBold: {
    color: '#409DC4',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'left',
    textTransform: 'uppercase',
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
