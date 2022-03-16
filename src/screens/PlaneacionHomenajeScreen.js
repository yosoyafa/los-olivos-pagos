import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WebViewComponent from '../components/WebViewComponent';

const PlaneacionHomenajeScreen = ({ navigation }) => {

    const url = 'https://novedades.losolivosvillavicencio.com/homenajes/';

    const openDrawer = () => navigation.openDrawer();

    return <View style={styles.view}>
        <View style={styles.header}>
            <Text style={styles.title}>Planeación del Homenaje</Text>
            <Icon style ={styles.icon} name='menu' size={30} onPress={openDrawer} />
        </View>
        <WebViewComponent
            url={url}
        />
    </View>
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    header: {
        height: 55,
        backgroundColor: 'white',
        elevation: 2
    },
    title: {
        marginTop: 15,
        marginStart: 15,
        fontWeight: 'bold',
        fontSize: 20
    },
    icon: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 999
    }
});

export default PlaneacionHomenajeScreen;