import React, { useState, useContext, useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { FAB, TextInput, Button, Text, } from 'react-native-paper';
import { Dialog } from 'react-native-simple-dialogs';
import md5 from 'md5';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import Context from '../../context/Context';

const LoginScreen = (props) => {

    const { modifyLogged, modifyInvitado, modifyUsuario, numeroEmergencia, setUp } = useContext(Context);

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const [cedula, setCedula] = useState('');
    const [password, setPassword] = useState('');
    const [cedulaReset, setCedulaReset] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);

    /*useEffect(() => {
        setUp(hideSplash);
    }, []);
    
    const hideSplash = () => {
        SplashScreen.hide();
    }*/

    const emergencyCall = () => {
        RNImmediatePhoneCall.immediatePhoneCall(numeroEmergencia);
    };

    const login = async () => {
        if (cedula && password) {
            try {
                let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getClienteApp.php?cli_numerodocumento=${cedula}&cli_clave=${md5(password)}`);
                let json = await response.json();
                if (json.estado === 'OK') {
                    modifyUsuario({
                        nombre: json.nombre,
                        cedula: json.cedula
                    });
                    modifyLogged('1');
                    modifyInvitado('0');
                } else {
                    Alert.alert("Error", "Usuario o contraseña incorrectos");
                }
            } catch (error) {
                Alert.alert("Error", "Revisa tu conexión a internet");
                console.error(error);
            }
        } else {
            Alert.alert("Error", "Usuario o contraseña incorrectos");
        }
    };

    const loginInvitado = () => {
        modifyLogged('1');
        modifyInvitado('1');
    };

    const resetPass = async () => {

        if (cedulaReset) {
            try {
                let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/recuperaClave.php?cedula=${cedulaReset}`);
                let json = await response.json();
                if (json.estado === 'OK') {
                    Alert.alert("Éxito", "Revisa tu correo (también en spam) para reestablecer tu contraseña.");
                    //ToastAndroid.show("Revisa tu correo para reestablecer tu contraseña", ToastAndroid.SHORT);
                    setDialogVisible(false);
                } else {
                    Alert.alert("Error", `La cédula ${cedulaReset} no se encuentra registrada.`);
                }
            } catch (error) {
                Alert.alert("Error", "Revisa tu conexión a internet");
                console.error(error);
            }
        } else {
            Alert.alert("Error", "Cédula incorrecto");
        } 
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignContent: 'space-between' }}>
                    <Image
                        style={[{
                            width: windowWidth * 0.30,
                            height: windowHeight * 0.1636,
                        }, styles.image]}
                        source={require('../../../assets/icon.png')}
                    />
                    <TextInput
                        theme={{
                            colors: {
                                primary: '#009366',
                                accent: '#b58603',
                            }
                        }}
                        mode='outlined'
                        label='Cédula'
                        value={cedula}
                        onChangeText={text => setCedula(text)}
                        style={{ marginBottom: 20 }}
                    />
                    <TextInput
                        theme={{
                            colors: {
                                primary: '#009366',
                                accent: '#b58603',
                            }
                        }}
                        secureTextEntry={true}
                        mode='outlined'
                        label='Contraseña'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={{ marginBottom: 20 }}
                    />
                    <Button
                        theme={{
                            colors: {
                                primary: '#009366',
                                accent: '#b58603',
                            }
                        }}
                        icon='login'
                        mode='contained'
                        onPress={() => login()}
                        style={{ marginBottom: 10 }}>
                        Ingresar
                </Button>
                    <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 40 }} onPress={() => { setDialogVisible(true) }}>
                        <Text
                            style={{ color: '#b58603', textDecorationLine: 'underline' }}>
                            Olvidé mi contraseña
                    </Text>
                    </TouchableOpacity>
                    <Button
                        theme={{ colors: { primary: '#009366' } }}
                        icon='account-plus-outline'
                        onPress={() => props.navigation.navigate('SignUp')}>
                        Registrarse
                    </Button>
                </View>
                <Button
                    theme={{ colors: { primary: '#b58603' } }}
                    onPress={() => loginInvitado()}>
                    Seguir como Invitado
                </Button>
            </View>
            <Dialog
                visible={dialogVisible}
                title="Reestablecer contraseña"
                onTouchOutside={() => setDialogVisible(!dialogVisible)}
            >
                <View>
                    <Text style={{ marginBottom: 20 }}>Ingresa tu número de cédula y enviaremos a tu correo electrónico registrado un link para restaurar tu contraseña.</Text>
                    <TextInput
                        theme={{ colors: { primary: '#009366' } }}
                        value={cedulaReset}
                        onChangeText={text => setCedulaReset(text)}
                        label='Cédula'
                        mode='outlined'
                    />
                    <Button
                        theme={{ colors: { primary: '#009366' } }}
                        icon='check-circle-outline'
                        mode="contained"
                        onPress={() => resetPass()}
                        style={{ marginTop: 20 }}>
                        OK
                    </Button>
                </View>
            </Dialog>
            <FAB
                style={styles.fab}
                small={false}
                onPress={() => {
                    emergencyCall();
                }}
                label='Emergencia'
                icon='alarm-light-outline'
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'space-between'
    },
    image: {
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center'
    },
    image2: {
        width: '67%', //windowWidth*0.67,
        height: '20%', //windowHeight*0.20,
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009366'
    }
});

export default LoginScreen;