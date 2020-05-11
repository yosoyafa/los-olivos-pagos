import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = (props) => {
    return (<View style={styles.webview}>
        <WebView
            source={{ uri: props.url }}
        />
    </View>);
};

const styles = StyleSheet.create({
    webview: {
        flex: 1
    }
});

export default WebViewComponent;