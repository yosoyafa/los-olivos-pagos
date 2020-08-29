import React, { useState, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Caption } from 'react-native-paper';
import NumberFormat from 'react-number-format';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PlanTable from '../components/PlanTable';
import Context from '../context/Context';

const PlansCarousel = (props) => {
    const { planes } = useContext(Context);

    const [activeIndex, setActiveIndex] = useState(0);
    const [tableVisible, setTableVisible] = useState(false);

    return (
        <>
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                    {planes ?
                        <FlatList
                            data={planes}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.Poliza}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 185,
                                            width: 250,
                                            paddingTop: 10,
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>
                                        <Icon style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }} name='dots-horizontal' size={30} color={'#b58603'} onPress={() => setTableVisible(true)} />
                                        <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={() => {setActiveIndex(index); setTableVisible(true)}}>
                                            <View style={{ flex: 1, margin: 5 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.Poliza}</Text>
                                                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.asegurado}</Text>
                                                <Caption numberOfLines={1} style={{ marginBottom: 20 }}>{item.tomador}</Caption>
                                                <NumberFormat value={item.total} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Total: $'} renderText={value => <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 15, marginBottom: 5, alignSelf: 'flex-end' }}>
                                                    {value}
                                                </Text>} />
                                                <NumberFormat value={item.cuota} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Cuota: $'} renderText={value => <Text style={{ fontWeight: 'bold', color: '#b58603', fontSize: 18, marginBottom: 5, alignSelf: 'flex-end' }}>
                                                    {value}
                                                </Text>} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                        /*<Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={planes}
                            sliderWidth={250}
                            itemWidth={300}
                            renderItem={({ item, index }) =>
                                <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    height: 185,
                                    paddingTop: 10,
                                    marginLeft: 20,
                                    marginRight: 20
                                }}>
                                    <Icon style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }} name='dots-horizontal' size={30} color={'#b58603'} onPress={() => setTableVisible(true)} />
                                    <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={() => setTableVisible(true)}>
                                        <View style={{ flex: 1, margin: 5 }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.Poliza}</Text>
                                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.asegurado}</Text>
                                            <Caption numberOfLines={1} style={{ marginBottom: 20 }}>{item.tomador}</Caption>
                                            <NumberFormat value={item.total} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Total: $'} renderText={value => <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 15, marginBottom: 5, alignSelf: 'flex-end' }}>
                                                {value}
                                            </Text>} />
                                            <NumberFormat value={item.cuota} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Cuota: $'} renderText={value => <Text style={{ fontWeight: 'bold', color: '#b58603', fontSize: 18, marginBottom: 5, alignSelf: 'flex-end' }}>
                                                {value}
                                            </Text>} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            onSnapToItem={index => {
                                console.log('snap');
                                setActiveIndex(index)
                            }}
                        />*/
                        :
                        null
                    }
                </View>
            </SafeAreaView>
            <Overlay
                isVisible={tableVisible}
                onBackdropPress={() => setTableVisible(false)}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto"
            >
                <PlanTable plan={planes[activeIndex]} onClose={setTableVisible} />
            </Overlay>
        </>
    );
}

export default PlansCarousel;