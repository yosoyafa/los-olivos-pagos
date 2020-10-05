import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';

import SedesScreen from './src/screens/SedesScreen';
import ContactFormScreen from './src/screens/ContactFormScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import AfiliationScreen from './src/screens/AfiliationScreen';
import InfoScreen from './src/screens/InfoScreen';
import PlansScreen from './src/screens/plans/PlansScreen';
import PlanDetailsScreen from './src/screens/plans/PlanDetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import DrawerContent from './src/components/DrawerContent';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';

import Context, { Provider } from './src/context/Context';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const PlansStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true
      }}
    >
      <Stack.Screen
        name='Plans'
        options={{ headerShown: false }}
        component={PlansScreen} />
      <Stack.Screen
        name='PlanDetails'
        options={({ route }) => ({
          title: route.params.item.titulo
        })}
        component={PlanDetailsScreen} />
      <Stack.Screen
        name='Form'
        options={({ route }) => (route.params.plan ?
          {
            title: route.params.plan
          }
          : {
            title: 'Deja tus datos'
          }
        )}
        component={ContactFormScreen} />
    </Stack.Navigator>);
}


const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true
      }}
    >
      <Stack.Screen
        name='Home'
        options={{ headerShown: false }}
        component={HomeScreen} />
      <Stack.Screen
        name='Payment'
        component={PaymentScreen}
        options={{ title: 'Pagos' }} />
      <Stack.Screen
        name='Form'
        component={ContactFormScreen}
        options={{ title: 'Deja tus Datos' }} />
    </Stack.Navigator >
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> } drawerContentOptions={{activeTintColor: '#009366',}}>
      <Drawer.Screen
        name='Home'
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => {
            return <Icon
              name='home'
              color={color}
              size={size}
            />
          }
        }}
        component={HomeStack}
      />
      <Drawer.Screen
        name='Plans'
        options={{
          title: 'Planes',
          drawerIcon: ({ color, size }) => {
            return <Icon
              name='notebook'
              color={color}
              size={size}
            />
          }
        }}
        component={PlansStack}
      />
      <Drawer.Screen
        name='Payment'
        options={{
          title: 'Pagos',
          drawerIcon: ({ color, size }) => {
            return <Icon
              name='cash'
              color={color}
              size={size}
            />
          }
        }}
        component={PaymentScreen}
      />
      <Drawer.Screen
        name='Sedes'
        options={{
          title: 'Sedes',
          drawerIcon: ({ color, size }) => {
            return <Icon
              name='map-marker'
              color={color}
              size={size}
            />
          }
        }}
        component={SedesScreen}
      />
      <Drawer.Screen
        name='Afiliation'
        options={{
          title: 'Quiero afiliarme',
          drawerIcon: ({ color, size }) => {
            return <Icon
              name='plus-circle'
              color={color}
              size={size}
            />
          }
        }}
        component={AfiliationScreen}
      />
      <Drawer.Screen
        name='Form'
        options={{
          title: 'Quiero ser contactado',
          drawerIcon: ({ color, size }) => {
            return <Icon
              name='face-agent'
              color={color}
              size={size}
            />
          }
        }}
        component={ContactFormScreen}
      />
      <Drawer.Screen
        name='Info'
        options={{
          title: 'Más información',
          drawerIcon: ({ color, size }) => {
            return <Icon
              name='information'
              color={color}
              size={size}
            />
          }
        }}
        component={InfoScreen}
      />
    </Drawer.Navigator>
  );
}

const Switch = () => {
  const { setUp, logged } = useContext(Context);

  useEffect(() => {
    setUp(hideSplash);
  }, []);

  const hideSplash = () => {
    SplashScreen.hide();
  }

  return (
    <Stack.Navigator>
      {
        logged === '0' ?
          <>
            <Stack.Screen
              name='Login'
              options={{ headerShown: false }}
              component={LoginScreen} />
            <Stack.Screen
              name='SignUp'
              options={{ headerShown: false }}
              component={SignUpScreen} />
          </>
          :
          <Stack.Screen
            name='Drawer'
            options={{ headerShown: false }}
            component={MyDrawer} />
      }
    </Stack.Navigator>
  );
}

const app = () => {
  console.disableYellowBox = true;
  return (
    <Provider>
      <NavigationContainer>
        <Switch />
      </NavigationContainer>
    </Provider>
  );
};

//app = codePush(app);

export default codePush(app);