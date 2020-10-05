import React, { useContext, useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WebViewComponent from '../components/WebViewComponent';
import { View, Text, ActivityIndicator } from 'react-native';
import Context from '../context/Context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator();

const PaymentScreen = ({ navigation }) => {

    const { getLinksPagos, linksPagos } = useContext(Context);

    useEffect(() => {
        getLinksPagos();
    }, []);

    return <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginStart: 20, marginTop: 20, color: '#b58603' }}>PAGOS</Text>
        <Icon style={{ position: 'absolute', top: 20, right: 20, zIndex: 999 }} name='menu' size={30} onPress={() => navigation.openDrawer()} />
        {console.log('links: '+linksPagos)}
        {linksPagos ?
            <Tab.Navigator
                keyboardDismissMode={'auto'}
                tabBarOptions={{
                    activeTintColor: '#009366',
                }}>
                {linksPagos.map(link => {
                    const name = link.name;
                    const comp = () => <WebViewComponent url={link.valorparametro} />
                    return <Tab.Screen name={name} component={comp} />
                })}
            </Tab.Navigator>
            :
            <ActivityIndicator size="large" />
        }
    </View>
};

export default PaymentScreen;