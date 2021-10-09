import { useNavigation } from '@react-navigation/native'
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

export default function Inicio(): JSX.Element {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    
    return (
        <View style={styles().container}>
            <Image
                source={{ uri: 'https://via.placeholder.com/600/92c952' }}
                style={{ width: windowWidth, height: windowHeight * 0.6 }}
            />

            <View style={{ flex: 2, flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity
                    style={styles(windowWidth * 0.5).button}
                    onPress={() => navigation.navigate('LoginStack')}
                >
                    <Text style={styles().text}>
                        INICIAR SESION
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles(windowWidth * 0.5).button}
                    onPress={() => navigation.navigate('Registrarse')}
                >
                    <Text style={styles().text}>
                        REGISTRARSE
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity
                    style={styles(windowWidth * 0.5).button}
                    onPress={() => navigation.navigate('UnauthenticatedStack')}>
                    <Text style={styles().text}>
                        SERVICIOS Y COMERCIOS
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = (widthScreen = 150) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: widthScreen,
        backgroundColor: '#409DC4',
        borderWidth: 5,
        borderColor: '#FFF',
        borderRadius: 20,
        justifyContent: 'space-evenly',
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});