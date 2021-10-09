import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';

export default function FinalizaRegistro(): JSX.Element {

    const [clave, setClave] = React.useState('');
    const [claveRepetida, setClaveRepetida] = React.useState('');

    const finalizarRegistro = () => {
        Alert.alert(clave);
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 40, flex: 3 }}>
                <TextInput
                    style={styles.input}
                    placeholder='Ingrese una clave'
                    placeholderTextColor='#409DC4'
                    value={clave}
                    keyboardType='ascii-capable'
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText={setClave}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Ingrese nuevamente la clave'
                    placeholderTextColor='#409DC4'
                    value={claveRepetida}
                    keyboardType='ascii-capable'
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText={setClaveRepetida}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={finalizarRegistro}
                >
                    <Text style={styles.ingresar}>
                        FINALIZAR REGISTRO
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
    button: {
        width: 300,
        marginTop: 40,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#C9E9FC',
        justifyContent: 'space-between',
    },
    municipio: {
        width: 300,
        marginTop: 40,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#C9E9FC',
        color: '#409DC4',
        fontStyle: 'italic',
        justifyContent: 'space-between',
    },
    ingresar: {
        color: '#409DC4',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    condicion: {
        width: 277,
        marginTop: 20,
        color: '#409DC4',
        textAlign: 'left',
        fontStyle: 'italic',
        borderBottomWidth: 1,
        borderColor: '#C9E9FC',
        marginLeft: 30,
    },
    input: {
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
        textAlign: 'center',
        color: '#000',
        fontStyle: 'italic'
    },
});