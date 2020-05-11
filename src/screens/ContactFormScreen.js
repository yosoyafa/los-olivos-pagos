import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useForm } from 'react-hook-form';

const ContactFormScreen = (props) => {

    const terminos = 'https://www.villavicencio.losolivos.co/node/11418';

    //const [crm, setCrm] = useState(null);

    const { register, setValue, handleSubmit, errors } = useForm()
    const onSubmit = async (data) => {



        let resp = 'fail';

        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/inserta_contacto.php?nombre=${data.nombre}&cedula=${data.cedula}&telefono=${data.telefono}&correo=${data.correo}&ttmtodatos=${data.ttmtodatos}`);
            let json = await response.json();
            console.log(json);
            resp = json.estado;
        } catch (error) {
            console.error(error);
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
        <View style={styles.container}>

            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                onChangeText={text => setValue('nombre', text, true)}
            />

            <Text style={styles.text}>Cédula</Text>
            <TextInput
                style={styles.input}
                keyboardType={'numeric'}
                underlineColorAndroid='transparent'
                onChangeText={text => setValue('cedula', text, true)}
            />

            <Text style={styles.text}>Teléfono</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
                onChangeText={text => setValue('telefono', text, true)}
            />

            <Text style={styles.text}>Correo</Text>
            <TextInput
                style={styles.input}
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
                title='enviar'
                color='#ffb725'
                disabled={false && !check}
                onPress={handleSubmit(onSubmit)}
            />
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
        marginEnd: 15,
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5,
        paddingStart: 10
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