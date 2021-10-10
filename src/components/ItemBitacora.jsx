import React from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

export default function BitacoraItem(props:any): JSX.Element {
    return(
        <View style={styles.container}>
            <Text style={styles.wrapper}>
                <Text style={styles.text}>
                    {props.titulo}
                </Text >
                <Text style={styles.text}>
                    {props.fecha}
                </Text>
                <Text style={styles.text}>
                    {props.icono}
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    wrapper: {
        width: 200,
        marginTop: 10,
        lineHeight: 25,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
    },
    text: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'normal',
    },
});