import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebViewComponent from '../components/WebViewComponent';

const AfiliationScreen = (props) => {
    const {url} = props.route.params;
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