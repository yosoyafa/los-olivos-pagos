import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactFormScreen = ({ route, navigation }) => {

    const terminos = 'https://www.villavicencio.losolivos.co/node/11418';

    //const [crm, setCrm] = useState(null);
    let plan;

    if (route.params) {
        plan = route.params.plan;
    }

    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = async (data) => {
        let resp = 'fail';
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/inserta_contacto.php?nombre=${data.nombre}&cedula=${data.cedula}&telefono=${data.telefono}&correo=${data.correo}&ttmtodatos=${data.ttmtodatos}&nombreplan=general`);
            if (plan) {
                response = await fetch(`https://ws.crmolivosvillavicencio.com/app/inserta_contacto.php?nombre=${data.nombre}&cedula=${data.cedula}&telefono=${data.telefono}&correo=${data.correo}&ttmtodatos=${data.ttmtodatos}&nombreplan=${plan}`);
            }
            let json = await response.json();
            console.log(json);
            resp = json.estado;
        } catch (error) {
            Alert.alert('Fallo', 'No se pudo completar tu solicitud, intenta mas tarde');
        }
        console.log(resp);
        if (resp === 'successful') {
            Alert.alert('Éxito', 'Nos pondremos en contacto contigo');
        } else {
            Alert.alert('Fallo', 'No se pudo completar tu solicitud, intenta mas tarde');
        }
    };

    useEffect(() => {
        register({ name: 'nombre' }, { required: true });
        register({ name: 'cedula' }, { required: true });
        register({ name: 'telefono' }, { required: true });
        register({ name: 'correo' }, { required: true });
        register({ name: 'ttmtodatos' }, { required: true });
    }, [register]);

    const [check, setCheck] = useState(false);

    return <ScrollView>
        {!plan && <View style={{ height: 55, backgroundColor: 'white', elevation: 2 }}>
            <Text style={{ marginTop: 15, marginStart: 15, fontWeight: 'bold', fontSize: 20 }}>Deja tus datos</Text>
            <Icon style={{ position: 'absolute', top: 15, right: 15, zIndex: 999 }} name='menu' size={30} onPress={() => navigation.openDrawer()} />
        </View>}
        <View style={styles.container}>
            <TextInput
                theme={{
                    colors: {
                        primary: '#009366',
                        accent: '#b58603',
                    }
                }}
                mode='outlined'
                style={styles.input}
                label='Nombre'
                onChangeText={text => setValue('nombre', text, true)}
            />

            <TextInput
                keyboardType={'numeric'}
                theme={{
                    colors: {
                        primary: '#009366',
                        accent: '#b58603',
                    }
                }}
                style={styles.input}
                label='Cédula'
                mode='outlined'
                onChangeText={text => setValue('cedula', text, true)}
            />

            <TextInput
                theme={{
                    colors: {
                        primary: '#009366',
                        accent: '#b58603',
                    }
                }}
                label='Teléfono'
                style={styles.input}
                mode='outlined'
                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
                onChangeText={text => setValue('telefono', text, true)}
            />

            <TextInput
                theme={{
                    colors: {
                        primary: '#009366',
                        accent: '#b58603',
                    }
                }}
                style={styles.input}
                label='Correo'
                mode='outlined'
                underlineColorAndroid='transparent'
                onChangeText={text => setValue('correo', text, true)}
            />

            {(errors.nombre || errors.cedula || errors.telefono || errors.correo) && <Text style={{ color: '#ff0000' }}>Todos los campos son requeridos.</Text>}


            <View style={styles.checkBoxContainer}>
                <CheckBox
                    value={check}
                    onValueChange={(value) => {
                        setCheck(value);
                        setValue('ttmtodatos', value, true);
                    }}
                />
                <Text >Autorizo el </Text>
                <TouchableOpacity
                    onPress={() => { Linking.openURL(terminos) }}>
                    <Text style={styles.link}>Tratamiento de Datos</Text>
                </TouchableOpacity>
            </View>
            <Button
                theme={{
                    colors: {
                        primary: '#009366',
                        accent: '#b58603',
                    }
                }}
                mode='contained'
                disabled={false && !check}
                onPress={handleSubmit(onSubmit)}>
                Enviar
                </Button>
        </View>
    </ScrollView >
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        margin: 15
    },
    text: {
        fontSize: 16,
        marginStart: 15
    },
    input: {
        marginTop: 5,
        marginBottom: 15,
        marginStart: 15,
        marginEnd: 15
    },
    link: {
        textDecorationLine: 'underline',
        color: '#02845A'
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 10
    }
});

export default ContactFormScreen;