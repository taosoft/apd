import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface BienvenidoProps {
  route: RouteProp<{ params: { authenticated: boolean } }, 'params'>
}

export default function Bienvenido({ route }: BienvenidoProps): JSX.Element {
  const navigation = useNavigation()
  const { authenticated } = route.params;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, flex: 3 }}>
        {authenticated && (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ReclamosStack')}
              >
                <Text style={styles.text}>
                  Reclamos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DenunciasStack")}
              >
                <Text style={styles.text}>
                  Denuncias
                </Text>
              </TouchableOpacity>
            </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ComerciosStack')}
        >
          <Text style={styles.text}>
            Comercios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ServiciosStack")}
        >
          <Text style={styles.text}>
            Servicios Profesionales
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePosition: {
    flex: 1,
    position: 'relative',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  titleText: {
    marginTop: 70,
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'sans-serif',
    color: '#409DC4',
  },
  button: {
    width: 300,
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C9E9FC',
    justifyContent: 'space-between',
  },
  text: {
    color: '#409DC4',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});