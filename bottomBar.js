import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function BottomBar({ navigation }) {

  return (
    <View style={styles.bar}>
        <Icon
            onPress={() => Alert.alert("Profile")}
            name='user'
            size={30}
            color='#409DC4'
        />
        <Icon
            onPress={()=>navigation.navigate('Home')}
            name='home'
            size={30}
            color='#409DC4'
        />
        <Icon
            onPress={() => Alert.alert("Notifications")}
            name='notification'
            size={30}
            color='#409DC4'
        />
    </View>
  );
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        marginBottom: 15,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#C9E9FC',
        width: '90%',
    },
});
