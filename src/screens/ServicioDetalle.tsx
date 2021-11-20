import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

export default function Login(): JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.titleText}>Servicio de contaduría</Text>
          <View style={styles.row}>
            <Text style={styles.titulo}>Horario:</Text>
            <Text style={styles.datos}>De 9hs a 14hs / De 15hs a 19hs</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Nombre completo:</Text>
            <Text style={styles.datos}>Paula Sarasa</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Dirección:</Text>
            <Text style={styles.datos}>Cuchacucha 123</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Teléfono:</Text>
            <Text style={styles.datos}>0800-123-4567</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>E-mail:</Text>
            <Text style={styles.datos}>ventas@servicioTal.com.ar</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titulo}>Rubro:</Text>
            <Text style={styles.datos}>Contable</Text>
          </View>
          <Text style={styles.textSubBold}>Descripcion</Text>
          <Text style={styles.datosDescripcion}>
            Mucha descripcion, Mucha descripcion, Mucha descripcion, Mucha
            descripcion, Mucha descripcion, Mucha descripcion, Mucha
            descripcion, Mucha descripcion, Mucha descripcion, Mucha
            descripcion, Mucha descripcion, Mucha descripcion, Mucha
            descripcion, Mucha descripcion, Mucha descripcion, Mucha
            descripcion, Mucha descripcion, Mucha descripcion, Mucha
            descripcion, Mucha descripcion, Mucha descripcion, Mucha
            descripcion, Mucha descripcion,
          </Text>
          <Text style={styles.textSubBold}>Imagenes</Text>

          <ImageLayout
            images={[
              {
                uri: 'https://www.olavarria.gov.ar/wp-content/uploads/2017/12/Plaza-Julio-Pagano-B%C2%BA-Bancario-1-1024x683.jpg',
              },
              {
                source: {
                  uri: 'https://www.pergamino.gob.ar/wp-content/uploads/2019/09/juegos-Plaza-Da%CC%81vila-7-1024x682.jpeg',
                },
              },
              {
                dimensions: { height: 1920, width: 1080 },

                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Plaza_25_de_Mayo_Rosario_2.jpg/1200px-Plaza_25_de_Mayo_Rosario_2.jpg',
              },
              {
                URI: 'https://www.msm.gov.ar/wp-content/uploads/2014/12/PLAZA-TRUJUI.jpg',
                id: 'blpccx4cn',
              },
              {
                url: 'https://greatruns.com/wp-content/uploads/2017/05/plaza-holanda.jpg',
              },
              {
                URL: 'https://www.welcomeargentina.com/paseos/plazas_mendoza/plazas_mendoza-2.jpg',
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  alert: {
    color: 'red',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  datos: {
    color: '#808080',
    flex: 1,
    fontSize: 19,
    paddingLeft: 5,
    paddingTop: 5,
    textAlign: 'justify',
  },
  datosDescripcion: {
    color: '#808080',
    fontSize: 19,
    marginTop: 5,
    textAlign: 'justify',
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textSubBold: {
    color: '#409DC4',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
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
  titulo: {
    color: '#409DC4',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },
})
