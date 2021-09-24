import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Registrarse({ navigation }) {

    const [dni, setDNI] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [nroTramiteDNI, setNroTramiteDNI] = React.useState("");
    const [municipio, setMunicipio] = React.useState("nico");

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 40, flex: 3 }}>
                <TextInput
                    style={styles.input}
                    placeholder='Ingrese su DNI'
                    placeholderTextColor='#409DC4'
                    value={dni}
                    keyboardType='number-pad'
                    textContentType='username'
                    onChangeText={setDNI}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Ingrese su email'
                    placeholderTextColor='#409DC4'
                    value={email}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    onChangeText={setEmail}
                />
                <Picker
                    selectedValue={municipio}
                    style={styles.municipio}
                    onValueChange={(itemValue, itemIndex) => setMunicipio(itemValue)}
                    mode='dialog'
                >
                    <Picker.Item label="Nico" value="nico" />
                    <Picker.Item label="San Isidro" value="isidro" />
                </Picker>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Alert.alert(dni + ' ' + email + ' ' + municipio)}
                >
                    <Text style={styles.registrarse}>
                        REGISTRARSE
                    </Text>
                </TouchableOpacity>

                <Text style={styles.condicion}>
                    Deberá pertenecer al municipio seleccionado
                </Text>
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
        borderColor: '#FFF',
        justifyContent: 'space-between',
        backgroundColor: '#409DC4',
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
    registrarse: {
        color: '#FFF',
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