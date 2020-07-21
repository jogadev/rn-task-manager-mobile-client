import React, { useEffect, useState } from 'react';

import { View, Text, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import LoginForm from '../login/LoginForm'
import { getToken } from '../common/TokenLogic';
import LogoCaption from "./LogoCaption";

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#000000",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
    },
    logo: {
        resizeMode: 'contain',
        height: 120,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
        alignItems: "center"
    },
    logoWrapper: {
        flex: 0.8,
        justifyContent: "center"
    }
})

function WelcomeScreen(props) {
    const [token, setToken] = useState(null);

    useEffect(function () {
        async function getData() {
            const token = await getToken();
            setToken(token);
        }
        getData();
    }, []);

   return (
        <View style={styles.body}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
            <ImageBackground source={require('../../assets/img/login_bg.jpg')} style={styles.background}>
                <LogoCaption style={styles.logoWrapper} logoHeight={120} captionStyle={styles.header} caption="Welcome!" />
                <LoginForm navigation={{ ...props.navigation }}/>
            </ImageBackground>
        </View>
    )
}

export default WelcomeScreen;