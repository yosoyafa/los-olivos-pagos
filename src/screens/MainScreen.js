import React from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity, Button, ScrollView, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const MainScreen = ({ navigation }) => {

    //const windowWidth = useWindowDimensions().width;
    //console.log(windowWidth*0.8);

    const text1 = 'SERFUNLLANOS Los Olivos ha creado para usted una aplicación que le permitirá realizar pagos y afiliaciones en línea.';
    const text2 = 'Aplica para las sedes Meta, Casanare, Inirida y Guaviare';

    const politica = 'https://integracionip.com/privacy_policy1.html';

    return <ScrollView style={{ flex: 1, backgroundColor: '#d9d9d9' }}>
        <View style={styles.view}>
            <View style={styles.card}>
                <View style={styles.container}>
                    <Image
                        style={{ width: 300, height: 170 }}
                        source={require('../../assets/logorgb.png')}
                        resizeMode="contain"
                    />
                    {false && <Text style={styles.text_olivos}>Un homenaje al amor</Text>}

                    <Text style={styles.text1}>
                        {text1}
                    </Text>

                    <View style={styles.buttonsContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Pagos'
                                color='#ffb725'
                                onPress={() => { navigation.navigate('Payment') }}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title='Afiliaciones'
                                color='#ffb725'
                                onPress={() => {
                                    navigation.navigate('Afiliations', { url: 'https://docs.google.com/forms/d/e/1FAIpQLScVrr-wpQWw4r8l6xFRkBAjW_B8slsvMjQ26Kw11stGgPdkIA/viewform' });
                                }}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title='Quiero ser contactado'
                                color='#ffb725'
                                onPress={() => { navigation.navigate('Form') }}
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title='Más información'
                                color='#ffb725'
                                onPress={() => { navigation.navigate('Info') }}
                            />
                        </View>
                    </View>
                    <Text style={styles.text2}>
                        {text2}
                    </Text>
                    <TouchableOpacity
                        onPress={() => { Linking.openURL(politica) }}>
                        <Text style={styles.text_politica}>Política de privacidad</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    </ScrollView>;
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        margin: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundButtonsContainer: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    image: {
        flex: 1,
        height: 100,
        width: 100,
        marginTop: 10
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    },
    view: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    buttons: {
        flexDirection: 'row'
    },
    someButtonStyle: {
        backgroundColor: 'red'
    },
    text1: {
        textAlign: 'justify',
        fontSize: 15
    },
    text2: {
        textAlign: 'center',
        fontSize: 12
    },
    text_olivos: {
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 30,
        fontSize: 29,
        color: '#02845A'
    },
    text_politica: {
        textAlignVertical: 'bottom',
        marginTop: 20,
        fontSize: 10,
        textDecorationLine: 'underline',
        color: '#02845A'
    }
});

export default withNavigation(MainScreen);