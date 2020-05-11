import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WebViewComponent from '../components/WebViewComponent';

const pse = () => {
    return <WebViewComponent url={'https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=4319'} />
};

const aval = () => {
    return <WebViewComponent url={'https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00000026'} />
};

const Tab = createMaterialTopTabNavigator();

const PaymentScreen = () => {
    return <Tab.Navigator keyboardDismissMode={'auto'}>
            <Tab.Screen name="PSE" component={pse} />
            <Tab.Screen name="AvalPay Center" component={aval} />
        </Tab.Navigator>
};

export default PaymentScreen;