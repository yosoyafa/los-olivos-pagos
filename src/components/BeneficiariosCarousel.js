import React, { useState, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Caption } from 'react-native-paper';

import Context from '../context/Context';

const PlansCarousel = (props) => {
    const { beneficiarios } = useContext(Context);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                    {beneficiarios ?
                        <FlatList
                            data={beneficiarios}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.documento}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        height: 185,
                                        width: 250,
                                        padding: 0,
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>
                                        <View style={{ flex: 1, margin: 10 }}>
                                            <View style={{ flex: 1, margin: 5, marginTop: 15 }}>
                                                {item.poliza ? <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.poliza}</Text> : null}
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.asegurado}</Text>
                                                <Caption>{item.parentesco}</Caption>
                                                <Text style={{ marginBottom: 5 }}>Documento: {item.documento}</Text>
                                                <Text style={{ marginBottom: 5 }}>Fecha de nacimiento:{' '}{item.fechanacimiento}</Text>
                                                <Text>Edad:{' '}{item.edad}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                        /*<Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={beneficiarios}
                            sliderWidth={250}
                            itemWidth={300}
                            renderItem={({ item, index }) =>
                                <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    height: 185,
                                    padding: 0,
                                    marginLeft: 20,
                                    marginRight: 20
                                }}>
                                    <View style={{ flex: 1, margin: 10 }}>
                                        <View style={{ flex: 1, margin: 5, marginTop: 15 }}>
                                            {item.poliza ? <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.poliza}</Text> : null}
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.asegurado}</Text>
                                            <Caption>{item.parentesco}</Caption>
                                            <Text style={{ fontSize: 14 }}>Documento: {item.documento}</Text>
                                            <Text style={{ marginBottom: 5 }}>Fecha de nacimiento:{' '}{item.fechanacimiento}</Text>
                                            <Text>Edad:{' '}{item.edad}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            onSnapToItem={index => setActiveIndex(index)}
                        />*/
                        :
                        null
                    }
                </View>
            </SafeAreaView>
        </>
    );
}

export default PlansCarousel;