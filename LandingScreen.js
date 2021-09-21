import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LandingPage() {
  const [playerName, setPlayerName] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <StatusBar style="auto" />

      <View style={styles.playerBox} >
        <Text>Jugador 1</Text>
        <TextInput
          style={styles.inputPlayer}
          multiline={false}
          placeholder="Escriba su nombre"
          onChangeText={setPlayerName}
          value={playerName} />
      </View>
      
      <View style={styles.playerBox} >
        <Text>Jugador 2</Text>
        <Text style={styles.inputPlayer}>CPU</Text>
      </View>

      <Button
        title="Comenzar Partida"
        onPress={() => Alert.alert(playerName)}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
  },
  title: {
    marginTop: 100,
    fontSize: 40,
    fontWeight: 'bold',
  },
  playerBox: {
    alignItems: 'center',
    marginTop: 100,
  },
  inputPlayer: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});
