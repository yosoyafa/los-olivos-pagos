import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, RefreshControl, SafeAreaView, Linking } from 'react-native';
import { FAB, Title, Paragraph, Caption, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import BeneficiariosCarousel from '../components/BeneficiariosCarousel';
import PlansCarousel from '../components/PlansCarousel';
import Context from '../context/Context';

const HomeScreen = ({ navigation }) => {

    const { modifyLogged, modifyInvitado, modifyUsuario, getPlanes, getBeneficiarios, invitado, usuario, numeroEmergencia, planes, beneficiarios } = useContext(Context);

    useEffect(() => {
        if (usuario) {
            getPlanes(usuario.cedula);
            getBeneficiarios(usuario.cedula);
        }
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        refreshOn();
        if (usuario) {
            getInfo(refreshOff);
        } else {
            refreshOff();
        }
    }

    const getInfo = callback => {
        if (usuario) {
            getPlanes(usuario.cedula);
            getBeneficiarios(usuario.cedula);
            callback(false);
        }
    }

    const refreshOff = () => {
        setRefreshing(false);
    }

    const refreshOn = () => {
        setRefreshing(true);
    }

    const emergencyCall = () => {
        RNImmediatePhoneCall.immediatePhoneCall(numeroEmergencia);
    };

    const onActualizarDatos = () => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfXYw2p39mLofN-XJH9tJe8OtuGDcKyfxDvd044tc9YnTCcXA/viewform')

    const Body = () => {
        if (invitado !== '0') {
            return <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 40 }}>
                <Caption style={{ textAlign: 'center', fontSize: 16 }}>
                    Has ingresado como invitado. Inicia sesión para conocer sobre tu contratos.
                </Caption>
                <View style={{ marginTop: 30 }}>
                    <Button
                        theme={{ colors: { primary: '#009366' } }}
                        icon='login'
                        onPress={() => { modifyLogged('0'); modifyInvitado('0'); modifyUsuario(null) }}>
                        Iniciar Sesión
                    </Button>
                </View>
            </View>;
        } else {
            return (
                <View>
                    {planes ?
                        <View>
                            <View style={styles.planesContainer}>
                                <Text style={styles.titulos}>{planes.length == 1 ? 'Mi Plan' : 'Mis Planes'}</Text>
                                <Text style={styles.actualizarDatos} onPress={onActualizarDatos}>Actualizar datos</Text>
                            </View>
                            <PlansCarousel />
                        </View>
                        :
                        null
                    }

                    {beneficiarios ?
                        <View>
                            <View style={styles.beneficiariosContainer}>
                                <Text style={styles.titulos}>Mis Beneficiarios</Text>
                            </View>
                            <BeneficiariosCarousel />
                        </View>
                        :
                        null
                    }

                </View>
            );
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginEnd: 20, marginBottom: 5 }}>
                        <Icon name='menu' size={30} onPress={() => navigation.openDrawer()} />
                        <Image
                            source={require('../../assets/icon.png')}
                            style={{ width: 40, height: 40, borderRadius: 10, marginBottom: 10 }}
                        />
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View style={{ marginBottom: 100, flex: 1 }}>
                        <View style={{ marginStart: 20 }}>
                            <Title style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#b58603' }}>
                                Central Cooperativa del Llano{'\n'}Los Olivos</Title>
                            <Paragraph style={{ marginRight: 20, textAlign: 'justify' }}>SERFUNLLANOS Los Olivos ha creado para usted una aplicación que le permitirá realizar pagos y afiliaciones en línea.{'\n'}Explora el menú lateral para conocer todo lo que te ofrecemos.</Paragraph>
                        </View>

                        <Body />

                        {/*OBITUARIO
                        <Text style={styles.titulos}>Obituario</Text>
                        <ObituaryCarousel />*/}
                    </View>
                </ScrollView>

                <FAB
                    style={styles.fab}
                    small={false}
                    onPress={() => {
                        emergencyCall();
                    }}
                    label='Emergencia'
                    icon='alarm-light-outline'
                />
            </SafeAreaView >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 20,
        marginStart: 20,
        marginBottom: 3
    },
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009366'
    },
    titulos: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#b58603',
    },
    actualizarDatos: {
        fontWeight: '600',
        color: '#b58603',
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    beneficiariosContainer: {
        marginBottom: 15,
        marginTop: 30,
        marginStart: 20
    },
    planesContainer: {
        marginBottom: 15,
        marginTop: 30,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default HomeScreen;