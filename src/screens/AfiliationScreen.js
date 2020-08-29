import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebViewComponent from '../components/WebViewComponent';

const AfiliationScreen = (props) => {
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLScVrr-wpQWw4r8l6xFRkBAjW_B8slsvMjQ26Kw11stGgPdkIA/viewform';
    //const url = props.url;
    return (<View style={styles.view}>
        <WebViewComponent
            url={url}
        />
    </View>);
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
});

export default AfiliationScreen;