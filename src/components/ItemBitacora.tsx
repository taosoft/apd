import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export interface BitacoraItemProps {
  evento: string
}

export default function BitacoraItem(props: BitacoraItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.wrapper}>
        <Text style={styles.text}>{props.evento}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 1,
    lineHeight: 25,
    marginTop: 10,
    width: 200,
  },
})
