import React from 'react';
import { View, StyleSheet, ImageBackground, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InfoScreen = ({ navigation }) => {
    return <View style={{ flex: 1 }}>
        {false && <ImageBackground style={styles.image} source={require('../../assets/info.png')}>

        </ImageBackground>}
        <View style={{ height: 55, backgroundColor: 'white', elevation: 2 }}>
            <Text style={{ marginTop: 15, marginStart: 15, fontWeight: 'bold', fontSize: 20 }}>Más Información</Text>
            <Icon style={{ position: 'absolute', top: 15, right: 15, zIndex: 999 }} name='menu' size={30} onPress={() => navigation.openDrawer()} />
        </View>
        <Image style={styles.image} source={require('../../assets/info.png')} />
    </View>;
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center"
    }
});

export default InfoScreen;