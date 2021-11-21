import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ImageLayout from 'react-native-image-layout'

import useServicio from '../components/providers/useServicios'
import { ServicioModelDetalle } from '../services/servicios.service'

interface ServicioDetalleProps {
  route: RouteProp<{ params: { id: number } }, 'params'>
}

export default function ServicioDetalle({
  route,
}: ServicioDetalleProps): JSX.Element {
  const { id } = route.params
  const { getServicioDetalle } = useServicio()
  const [servicio, setServicio] = useState<ServicioModelDetalle>()

  useEffect(() => {
    getServicioDetalle(id).then((res) => {
      setServicio(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.titleText}>{servicio?.nombreServicio}</Text>
          <Text style={styles.textRubro}>De 09:00 hs a 14:00 hs</Text>
          <Text style={styles.textRubro}>De 16:00 hs a 18:00 hs</Text>
          <Text style={styles.textRubro}>
            Nombre de contacto: {servicio?.nombrePersona}
          </Text>
          <Text style={styles.textRubro}>Dirección: {servicio?.direccion}</Text>
          <Text style={styles.textRubro}>Teléfono: {servicio?.telefono}</Text>
          <Text style={styles.textRubro}>Email: {servicio?.email}</Text>
          <Text style={styles.textRubro}>
            Rubro: {servicio?.rubro.descripcion}
          </Text>
          <Text style={styles.textSubBold}>Descripción</Text>
          <Text style={styles.textDesc}>{servicio?.descripcion}</Text>
          <Text style={styles.textSubBold}>Imágenes</Text>

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
    fontSize: 20,
    marginTop: 5,
    textAlign: 'left',
  },
  textRubro: {
    color: '#409DC4',
    fontSize: 20,
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
  titleText: {
    color: '#409DC4',
    fontFamily: 'sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
})
