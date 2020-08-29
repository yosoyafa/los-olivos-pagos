import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';

const InfoScreen = (props) => {
    return <View style={{flex:1}}>
        {false && <ImageBackground style={styles.image} source={require('../../assets/info.png')}>

        </ImageBackground>}
        <Image style={styles.image} source={require('../../assets/info.png')}/>
    </View>;
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center"
      }
});

export default InfoScreen;