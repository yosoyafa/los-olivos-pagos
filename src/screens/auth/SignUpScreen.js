import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Dialog } from 'react-native-simple-dialogs';
import md5 from 'md5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = (props) => {

    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [dialogVisible, setDialogVisible] = useState(false);
    const [codigo, setCodigo] = useState('');

    const hasErrors = (field) => {
        switch (field) {
            case 'nombre':
                return (nombre.length === 0);
                break;
            case 'cedula':
                return (cedula.length === 0);
                break;
            case 'correo':
                return !(correo.includes('@'));
                break;
            case 'celular':
                return (!(/^\d+$/.test(celular)) || celular.length !== 10);
                break;
            case 'password':
                return !(password.length !== 0 && password.length > 9);
                break;
            case 'password2':
                return (password !== password2);
                break;
            default:
                return (
                    (nombre.length === 0)
                    || (cedula.length === 0)
                    || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo))
                    || (!(/^\d+$/.test(celular)) || celular.length !== 10)
                    || !(password.length !== 0 && password.length > 9)
                    || (password !== password2)
                );
        }
    }

    const signUpRequest = async () => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/insertaClienteApp.php?cli_nombre=${nombre}&cli_email=${correo}&cli_numerodocumento=${cedula}&cli_celular=${celular}&cli_clave=${md5(password)}`);
            let json = await response.json();
            if (json.estado === 'Correcto') {
                Alert.alert('Registro correcto', `Verifica tu cuenta accediendo al link que te hemos enviado a ${correo}. Recuerda revisar tu correo no deseado (spam)`);
                props.navigation.navigate('Login');
            } else {
                Alert.alert('Error', 'No se pudo procesar tu solicitud');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo procesar tu solicitud');
            console.error(error);
        }
    }

    const signup = () => {
        if (!hasErrors('all')) {
            signUpRequest();
            //setDialogVisible(!dialogVisible);
        }
    }

    const validateCode = code => {
        setDialogVisible(!dialogVisible);
        Alert.alert('Registro correcto', 'Ya puedes iniciar sesión');
        props.navigation.navigate('Login');
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#b58603' }}>Registro</Text>
                <TextInput
                    theme={{ colors: { primary: '#009366' } }}
                    mode='outlined'
                    label='Nombre'
                    value={nombre}
                    onChangeText={text => setNombre(text)}
                />
                <HelperText style={hasErrors('nombre') ? { marginBottom: 10 } : null} type="error" visible={hasErrors('nombre')}>
                    Ingresa un nombre válido
                </HelperText>
                <TextInput
                    theme={{ colors: { primary: '#009366' } }}
                    mode='outlined'
                    label='Cédula'
                    value={cedula}
                    onChangeText={text => setCedula(text)}
                />
                <HelperText style={hasErrors('cedula') ? { marginBottom: 10 } : null} type="error" visible={hasErrors('cedula')}>
                    Ingresa un número de cédula válido
                </HelperText>
                <TextInput
                    theme={{ colors: { primary: '#009366' } }}
                    mode='outlined'
                    label='Correo'
                    value={correo}
                    onChangeText={text => setCorreo(text.trim())}
                />
                <HelperText style={hasErrors('correo') ? { marginBottom: 10 } : null} type="error" visible={hasErrors('correo')}>
                    Ingresa un correo válido
                </HelperText>
                <TextInput
                    theme={{ colors: { primary: '#009366' } }}
                    mode='outlined'
                    label='Celular'
                    value={celular}
                    onChangeText={text => setCelular(text)}
                />
                <HelperText style={hasErrors('celular') ? { marginBottom: 10 } : null} type="error" visible={hasErrors('celular')}>
                    Ingresa un número de celular válido
                </HelperText>
                <TextInput
                    theme={{ colors: { primary: '#009366' } }}
                    secureTextEntry={true}
                    mode='outlined'
                    label='Contraseña'
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <HelperText style={hasErrors('password') ? { marginBottom: 10 } : null} type="error" visible={hasErrors('password')}>
                    La contraseña debe tener mínimo 10 caracteres
                </HelperText>
                <TextInput
                    theme={{ colors: { primary: '#009366' } }}
                    secureTextEntry={true}
                    mode='outlined'
                    label='Confirmar contraseña'
                    value={password2}
                    onChangeText={text => setPassword2(text)}
                />
                <HelperText style={hasErrors('password2') ? { marginBottom: 10 } : null} type="error" visible={hasErrors('password2')}>
                    Las contraseñas no coinciden
                </HelperText>
                <Button
                    theme={{ colors: { primary: '#009366' } }}
                    icon='account-plus-outline'
                    mode="contained"
                    onPress={() => signup()}
                    style={{ marginBottom: 20 }}>
                    Registrarse
                </Button>
            </View>
            <Dialog
                visible={dialogVisible}
                title="Confirmación"
                onTouchOutside={() => setDialogVisible(!dialogVisible)}
            >
                <View>
                    <Text style={{ marginBottom: 10 }}>Ingresa el código de verificación que hemos enviado al correo: {' '}{correo} </Text>
                    <TextInput
                        theme={{ colors: { primary: '#009366' } }}
                        value={codigo}
                        onChangeText={text => setCodigo(text)}
                        label='Código'
                        mode='outlined'
                    />
                    <Button
                        theme={{ colors: { primary: '#009366' } }}
                        icon='check-circle-outline'
                        mode="contained"
                        onPress={() => validateCode()}
                        style={{ marginTop: 20 }}>
                        OK
                    </Button>
                    <Button
                        theme={{ colors: { primary: '#b58603' } }}
                        onPress={() => signup()}
                        style={{ marginTop: 10 }}>
                        Reenviar código
                    </Button>
                </View>
            </Dialog>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignContent: 'space-between'
    },
    image: {
        width: windowWidth * 0.30,
        height: windowHeight * 0.1636,
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
    }
});

export default LoginScreen;