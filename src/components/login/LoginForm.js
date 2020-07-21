import React, { useState, isValidElement } from "react";

import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    inputs: {
        color: "#EEEEEE",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        marginLeft: 10,
    },
    inputWrapper: {
        backgroundColor: "rgba(255,255,255, 0.3)",
        borderRadius: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        paddingLeft: 15,
        alignItems: "center"
    },
    inputImage: {
        width: 18,
        height: 18,
    },
    buttonsWrapper: {
        marginTop: 20,
        alignItems: "center"
    },
    button: {
        backgroundColor: "#BB7049",
        color: "#FFFFFF",
        padding: 10,
        textAlign: "center",
        borderRadius: 20,
        fontWeight: "bold",
        fontSize: 18,
        width: "80%"
    },
    transparentButton: {
        color: "#FFFFFF",
        padding: 10,
        textAlign: "center",
        borderRadius: 20,
        fontSize: 15,
        width: "80%",
        marginTop: 10
    },
    warningText: {
        color: "#FF7130",
        textAlign: "center",
    },
    errorText: {
        color: "#FF3530",
        textAlign: "center"
    },
    loginWrapper: {
        width: "100%",
        maxWidth: 350,
    }
})


function LoginForm({enableBlur}) {
    const [values, setValues] = useState({
        email: "",
        password: "",
        warningText: "",
        errorText: ""
    });

    const navigation = useNavigation();

    function gotoSignup() {
        navigation.navigate("Signup")
    }

    function loginHandler() {
        if (values.email != "" && values.email.includes("@"))
            if (values.password != "") {
                alert("Attempt login")
            } else
                setValues(current => ({ ...current, warningText: "Please specify a password" }))
        else
            setValues(current => ({ ...current, warningText: "Please use a valid email address" }))
    }

    function handleChange(e) {
        //Somehow evt.target==15 => email, evt.target==17 => password
        if (e.target == 15)
            setValues({ ...values, email: e.nativeEvent.text })
        else if (e.target == 17)
            setValues({ ...values, email: e.nativeEvent.text });
    }

    const commonProps = {
        placeholderTextColor: "#D1D1D1",
        style: styles.inputs,
        onChange: handleChange
    }

    return (
        <View style={styles.loginWrapper}>
            <View style={styles.inputWrapper}>
                <Image source={require('../../assets/img/user.png')} style={styles.inputImage} />
                <TextInput
                    placeholder="Your email"
                    keyboardType="email-address"
                    {...commonProps} />
            </View>
            <View style={styles.inputWrapper}>
                <Image source={require('../../assets/img/padlock.png')} style={styles.inputImage} />
                <TextInput
                    placeholder="Your password"
                    secureTextEntry={true}
                    {...commonProps} />
            </View>

            <Text style={styles.warningText}>{values.warningText}</Text>
            <Text style={styles.errorText}>{values.errorText}</Text>

            <View style={styles.buttonsWrapper}>
                <TouchableWithoutFeedback onPress={loginHandler}>
                    <Text style={styles.button}>Continue</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={gotoSignup} color="rgba(0,0,0,0)">
                    <Text style={styles.transparentButton}>Not a user? Sign up now</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

module.exports = LoginForm