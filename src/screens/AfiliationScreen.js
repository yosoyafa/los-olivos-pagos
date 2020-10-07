import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WebViewComponent from '../components/WebViewComponent';

const AfiliationScreen = ({navigation}) => {
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLScVrr-wpQWw4r8l6xFRkBAjW_B8slsvMjQ26Kw11stGgPdkIA/viewform';
    //const url = props.url;
    return (<View style={styles.view}>
        <View style={{ height: 55, backgroundColor: 'white', elevation: 2 }}>
            <Text style={{ marginTop: 15, marginStart: 15, fontWeight: 'bold', fontSize: 20 }}>Quiero afiliarme</Text>
            <Icon style={{ position: 'absolute', top: 15, right: 15, zIndex: 999 }} name='menu' size={30} onPress={() => navigation.openDrawer()} />
        </View>
        <WebViewComponent
            url={url}
        />
    </View>);
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
});

export default AfiliationScreen;