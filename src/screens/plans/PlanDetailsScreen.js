import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const PlanDetailsScreen = (props) => {

    const { route } = props;
    const { item } = route.params;

    return <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
            {item.subtitulo ? <Text style={{ marginBottom: 10, textAlign: 'center' }}>{item.subtitulo}</Text> : null}
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Condiciones de ingreso:</Text>
            <Text style={{ marginBottom: 5 }}>{item.condiciones_de_ingreso}</Text>

            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Periodos de carencia:</Text>
            <Text>{item.periodos_de_carencia.statement}</Text>
            <View style={{ margin: 20 }}>
                {
                    item.periodos_de_carencia.list.map((li) => {
                        return (
                            <Text>
                                {`\u2022 `}<Text style={{ fontWeight: 'bold' }}>{li.split(':')[0]}{': '}</Text><Text>{li.split(':')[1]}</Text>
                            </Text>
                        );
                    })
                }
                <Text style={{ marginTop: 10 }}>{item.periodos_de_carencia.extra}</Text>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Destino final:</Text>
                <Text style={{ fontWeight: 'bold' }}>
                    {item.destino_final.statement}
                    <Text style={{ fontWeight: 'normal' }}>
                        {item.destino_final.value}
                    </Text>
                </Text>
            </View>

            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{item.parentesco.statement}</Text>
            <View style={{ marginBottom: 5 }}>
                {
                    item.parentesco.value.map((it) => it.includes(':') ?
                        <Text>
                            {`\u2022 `}<Text style={{ fontWeight: 'bold' }}>{it.split(':')[0]}{': '}</Text><Text>{it.split(':')[1]}</Text>
                        </Text>
                        :
                        <Text>{it}</Text>
                    )
                }
            </View>
            <Text>{item.parentesco.extra}</Text>
            <Button
                theme={{ colors: { primary: '#009366' } }}
                icon='heart'
                mode="contained"
                onPress={() => props.navigation.navigate('Form', { plan: item.titulo })}
                style={{ marginVertical: 20 }}>
                Adquirir
            </Button>
        </View>
    </ScrollView >
};

const styles = StyleSheet.create({

});

export default PlanDetailsScreen;