import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import WebViewScreen from './src/components/WebViewComponent';
import ContactFormScreen from './src/screens/ContactFormScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import AfiliationScreen from './src/screens/AfiliationScreen';
import InfoScreen from './src/screens/InfoScreen';

const app = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Central Cooperativa del Llano' component={MainScreen} />
        <Stack.Screen name='Form' component={ContactFormScreen} options={{ title: 'Deja tus datos' }}/>
        <Stack.Screen name='WebViewScreen' component={WebViewScreen} options={{ title: 'Afíliate' }}/>
        <Stack.Screen name='Payment' component={PaymentScreen} options={{ title: 'Pagos' }}/>
        <Stack.Screen name='Afiliations' component={AfiliationScreen} options={{ title: 'Afíliate' }}/>
        <Stack.Screen name='Info' component={InfoScreen} options={{ title: 'Más Información' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default app;