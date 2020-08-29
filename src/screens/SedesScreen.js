import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button, Paragraph } from 'react-native-paper';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dialog } from 'react-native-simple-dialogs';

const SedesScreen = ({ navigation }) => {

    const [visible, setVisible] = useState(false);

    const sedes = [
        {
            title: 'Villavicencio',
            image: require('../../assets/sedes/sede-vvicencio.png'),
            address: 'Avenida 40 20-50 (Camoa)',
            phone: '(8) 6653987 - 6685286',
            extra: 'Linea nacional gratuita: 01800915286',
            nums: ['+5786653987', '+5786685286', '01800915286']
        },
        {
            title: 'Granada',
            image: require('../../assets/sedes/sede-granada.png'),
            address: 'Carrera 11 22-16/20 (Montoya)',
            cellphone: '3134188086',
            nums: ['3134188086']
        },
        {
            title: 'Acacias',
            image: require('../../assets/sedes/sede-acacias.png'),
            address: 'Carrera 17 12-21 (Centro)',
            phone: '(8) 6569656',
            nums: ['+5786569656']
        },
        {
            title: 'Yopal',
            image: require('../../assets/sedes/sede-yopal.png'),
            address: 'Carrera 9 13-25 (20 de Julio)',
            phone: '(8) 6324566 - 6324121',
            cellphone: '3165225615',
            nums: ['+5786324566', '+5786324121', '3165225615']
        },
        {
            title: 'Aguazul',
            image: require('../../assets/sedes/sede-aguazul.png'),
            address: 'Calle 10 12-16 (Las Ferias)',
            phone: '(8) 6392710',
            cellphone: '3175110411',
            nums: ['+5786392710', '3175110411']
        },
        {
            title: 'Paz de Ariporo',
            image: require('../../assets/sedes/sede-paz.png'),
            address: 'Calle 13 9-56 (El Palmar)',
            phone: '(8) 6324121',
            cellphone: '3162298943',
            nums: ['+5786324121', '3162298943']
        },
        {
            title: 'Inírida',
            image: require('../../assets/sedes/sede-inirida.png'),
            address: 'Calle 16 11-132 (Comuneros)',
            cellphone: '3115640488',
            nums: ['3115640488']
        },
        {
            title: 'San José del Guaviare',
            image: require('../../assets/sedes/sede-sanjose.png'),
            address: 'Carrera 24 9-77 (La Esperanza)',
            phone: '(8) 5841534',
            cellphone: '3103344277',
            nums: ['+5785841534', '3103344277']
        },
        {
            title: 'Calamar',
            image: require('../../assets/sedes/sede-calamar.png'),
            address: 'Carrera 7 7-29',
            cellphone: '3103344277',
            nums: ['3103344277']
        },
        {
            title: 'Retorno',
            image: require('../../assets/sedes/sede-retorno.png'),
            address: 'Calle 9 8-15',
            cellphone: '3103344277',
            nums: ['3103344277']
        },
    ]

    const [active, setActive] = useState(sedes[0]);

    const getActive = (name) => {
        return sedes.filter(sede => sede.title === name)[0];
    }

    const makeCall = num => {
        call({ number: num, prompt: true }).catch(console.error);
    };

    const createList = (data) => {
        return (
            <>
                <View style={styles.slide1}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#009366' }}>{data.title}</Text>
                    <Image
                        style={{ height: '50%', width: '100%', marginBottom: 20, borderRadius: 10 }}
                        source={data.image}
                    />
                    <Text>{data.address}</Text>
                    {data.phone ? <Text>Teléfono: {data.phone}</Text> : null}
                    {data.cellphone ? <Text>Celular: {data.cellphone}</Text> : null}
                    {data.extra ? <Text>{data.extra}</Text> : null}
                    <Button
                        style={{ marginTop: 10 }}
                        mode='contained'
                        theme={{ colors: { primary: '#009366' } }}
                        icon='phone'
                        onPress={() => {
                            if (data.nums.length === 1) {
                                makeCall(data.nums[0]);
                            } else {
                                setActive(getActive(data.title));
                                setVisible(!visible);
                            }
                        }}>
                        Llamar
                    </Button>
                    {/*<View style={{ marginTop: 10, flexDirection: 'row-reverse' }}>
                        <IconButton
                            color='#009366'
                            icon='phone'
                            onPress={() => {
                                if (data.nums.length === 1) {
                                    makeCall(data.nums[0]);
                                } else {
                                    setActive(getActive(data.title));
                                    setVisible(!visible);
                                }
                            }} />
                        <IconButton
                            color='#009366'
                            icon='map-marker'
                        onPress={() => { }} />
                    </View>*/}
                </View>
            </>
        );
    };

    return (
        <View style={{ flex: 1, zIndex: 1 }}>
            <Icon style={{ position: 'absolute', top: 20, right: 20, zIndex: 999 }} name='menu' size={30} onPress={() => navigation.openDrawer()} />
            <View style={{ flex: 1 }}>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#b58603' }}>NUESTRAS SEDES</Text>
                    <Paragraph style={{ fontSize: 15 }}>Explora nuestras sedes y encuentra la más cercana a ti.</Paragraph>
                </View>
                <View style={{ flex: 1 }}>
                    <Swiper style={styles.wrapper} showsButtons={true} activeDotColor={'#b58603'} >
                        {sedes.map((value, index) => {
                            return createList(value);
                        })}
                    </Swiper>
                </View>
            </View>
            <Dialog
                visible={visible}
                title="Escoge el número a marcar:"
                onTouchOutside={() => setVisible(!visible)}
            >
                <View>
                    {active.nums.map(num => {
                        return (
                            <TouchableOpacity style={{ margin: 10 }} onPress={() => makeCall(num)}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#009366' }}>{num}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Dialog>
            {/*<Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
                {active.nums.map(num => {
                    return (
                        <TouchableOpacity style={{ margin: 5 }} onPress={() => makeCall(num)}>
                            <Text>{num}</Text>
                        </TouchableOpacity>
                    );
                })}
            </Overlay>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        marginTop: -50,
        justifyContent: 'center',
        paddingHorizontal: 60
    },
    slide2: {
        flex: 1,
        alignContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66000000'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default SedesScreen;