import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WebViewComponent from '../components/WebViewComponent';
import { View, Text } from 'react-native';

const pse = () => {
    return <WebViewComponent url={'https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=4319'} />
};

const aval = () => {
    return <WebViewComponent url={'https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00000026'} />
};

const Tab = createMaterialTopTabNavigator();

const PaymentScreen = ({ route, navigation }) => {
    return <View style={{ backgroundColor: 'white', flex: 1 }}>
        {false && <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#b58603' }}>Pagos</Text>}
        <Tab.Navigator keyboardDismissMode={'auto'}>
            <Tab.Screen name="PSE" component={pse} />
            <Tab.Screen name="AvalPay Center" component={aval} />
        </Tab.Navigator>
    </View>
};

export default PaymentScreen;