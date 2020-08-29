import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, Text } from 'react-native';
import { Button, Card as PaperCard } from 'react-native-paper';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import planes from '../../data/planes.json';
import servicio from '../../data/servicio.json';

const PlansScreen = ({ navigation }) => {

    const [visible, setVisible] = useState(false);

    const createCards = () => {
        return <FlatList
            data={planes}
            keyExtractor={item => item.titulo}
            renderItem={({ item }) => {
                return (
                    <PaperCard style={{ margin: 20 }}>
                        <PaperCard.Title title={item.titulo} titleStyle={{ color: '#009366' }} subtitle={item.subtitulo ? item.subtitulo : null} />
                        <PaperCard.Content>
                            {item.parentesco.value.map((text, index) => {
                                return (
                                    <Text style={{ fontSize: 15 }}>{text}</Text>
                                );
                            })}
                        </PaperCard.Content>
                        <PaperCard.Actions style={{ flexDirection: 'row-reverse' }}>
                            <Button
                                onPress={() => { navigation.navigate('PlanDetails', { item: item }) }}
                                theme={{
                                    colors: {
                                        primary: '#b58603',
                                    }
                                }}
                            >
                                Ver Más
                            </Button>
                        </PaperCard.Actions>
                    </PaperCard>

                    /*<Content padder>
                        <Card>
                            <CardItem header bordered>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: '#009366', fontWeight: 'bold' }}>{item.titulo}</Text>
                                    {item.subtitulo && <Caption>{item.subtitulo}</Caption>}
                                </View>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    {item.parentesco.value.map((text, index) => {
                                        return (
                                            <Text>{text}</Text>
                                        );
                                    })}
                                </Body>
                            </CardItem>
                            <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                                <Button
                                    onPress={() => { navigation.navigate('PlanDetails', { item: item }) }}
                                    color={'#b58603'}>Ver Más</Button>
                            </View>
                        </Card>
                    </Content>*/
                )
            }}
        />
    };

    const createList = (obj) => {
        return (
            <View style={styles.slide1}>
                <FlatList
                    data={obj.lines}
                    renderItem={({ item }) => <Text>{item}</Text>}
                    keyExtractor={item => item.lines}
                />
            </View>
        );
    };

    return (
        <>
            <View style={{ flex: 1 }}>
                <Icon style={{ position: 'absolute', top: 20, right: 20, zIndex: 999 }} name='menu' size={30} onPress={() => navigation.openDrawer()} />
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#b58603' }}>PLANES EXEQUIALES</Text>
                    {/*<Text style={{ fontSize: 15 }}>Explora los planes que tenemos para ti, elige el que mas se ajuste a tu necesidad y nos pondremos en contacto contigo lo antes posible.</Text>*/}
                    <Text>
                        <Text>Explora los difrentes planes que tenemos para ti. Puedes ver la cobertura general de todos los planes{' '}</Text>
                        <Text onPress={() => setVisible(true)} style={{ color: '#009366', textDecorationLine: 'underline' }}>aquí</Text>
                    </Text>
                </View>
                {createCards()}
            </View>
            <Overlay
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}>
                <ScrollView style={{ height: 200, width: '90%' }}>
                    {servicio.lines.map((value) => {
                        return <Text>{value}</Text>
                    })}
                </ScrollView>
            </Overlay>
        </>
    )
};

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 60
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    card: {
        flex: 1,
        margin: 2,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
});

export default PlansScreen;