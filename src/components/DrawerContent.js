import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Title, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Context from '../context/Context';

const DrawerContent = (props) => {

  const { modifyLogged, modifyInvitado, modifyUsuario, invitado, usuario, logged } = useContext(Context);

  return <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props} >
      {false && <Image
        style={styles.image}
        source={require('../../assets/logorgb.png')}
      />}
      <View style={styles.drawerContent}>
        {invitado === '0' && logged === '1' && usuario ?
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginStart: 15 }}>
                <Title style={styles.title}>{usuario.nombre}</Title>
                <Caption style={styles.caption}>{usuario.cedula}</Caption>
              </View>
            </View>
          </View>
          :
          null
        }
        <Drawer.Section style={styles.drawerSection}>
          <View style={{ marginLeft: 15 }}>
            <DrawerItemList {...props} />
          </View>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
    <Drawer.Section style={styles.bottomDrawerSection}>
      <Drawer.Item
        icon={({ color, size }) => invitado == '0' ?
          <Icon name='logout' color={color} size={size} />
          :
          <Icon name='login' color={color} size={size} />
        }
        label={invitado === '0' ? 'Cerrar sesión' : 'Iniciar sesión'}
        onPress={() => { modifyLogged('0'); modifyInvitado('0'); modifyUsuario(null) }}
      />
    </Drawer.Section>
  </View>
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  image: {
    margin: 5,
    alignSelf: 'center',
    width: '70%',
    height: '20%'
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 15
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;