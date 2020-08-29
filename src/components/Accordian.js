import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button } from 'react-native-elements';
import Unorderedlist from 'react-native-unordered-list';

export default class Accordian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: props.expanded,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity ref={this.accordian} onPress={() => this.toggleExpand()}>
                    <View style={styles.row}>
                        <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                        <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#000'} />
                    </View>
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <Unorderedlist bulletUnicode={'0x2022'}><Text>Atención y orientación todo el año.</Text></Unorderedlist>
                        <Unorderedlist><Text>Pago de impuestos de inhumación, diligencias ante secretaría de salud y registro notarial. (El certificado médico de defunción lo deben aportar los familiares).</Text></Unorderedlist>
                        <Unorderedlist><Text>Arreglo del ser querido.</Text></Unorderedlist>
                        <Unorderedlist><Text>Suministro de cofre.</Text></Unorderedlist>

                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Button
                                buttonStyle={{ margin: 10, backgroundColor: '#009366' }}
                                titleStyle={{ fontSize: 14 }}
                                title='LO QUIERO' />
                        </View>
                    </View>
                }

            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    parentHr: {
        height: 1,
        color: '#fff',
        width: '100%'
    },
    child: {
        backgroundColor: '#f5f5f5',
        padding: 16,
    }

});