import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { createNewUser } from "../common/APIEndpoints";
import LinearGradient from 'react-native-linear-gradient';
import LogoCaption from "../main/LogoCaption";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        maxWidth: 600
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#000"
    },
    title: {
        fontSize: 30,
        marginBottom: 50,
        color: "#F0F0F0"
    },
    inputs: {
        color: "#000000",
        width: "90%",
        backgroundColor: "rgba(255,255,255,0.8)",
        marginTop: 10,
        borderRadius: 15,
        paddingLeft: 10,
        fontWeight: "bold"
    },
    warningText: {
        color: "#FF7130",
        textAlign: "center",
        marginBottom: 3
    },
    errorText: {
        color: "#FF3530",
        textAlign: "center",
        marginBottom: 3
    },
    button: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        padding: 10,
        textAlign: "center",
        borderRadius: 20,
        fontWeight: "bold",
        fontSize: 18,
    },
});


function SignUp(props) {
    const [state, setState] = useState( {
        email: null,
        name: null,
        age: null,
        password: null,
        passwordConfirm: null,
        warning: null,
        error: null
    });

    const tiEmail = useRef();
    const tiAge = useRef();
    const tiPassword = useRef();
    const tiPasswordConfirm = useRef();
    const setError = handleChange("error");
    const setWarning = handleChange("warning");
    const navigation = useNavigation();

    async function attemptSignup({email, name, age, password}){
        console.log("Attempt signup");
        const signUpResult = await createNewUser(name, email, age, password);
        if(signUpResult.error)
            setError(signUpResult.error);
        else{
            console.log("Signup complete!");            
            navigation.replace('Profile', {
                token: signUpResult.data.token
            });
        }
    }

    function handleChange(id){
        return text => {        
            setState({...state, [id]: text});
        }
    }

    function validateForm(){
        if(!state.name)
            setWarning("Please provide a name");
        else if(!state.email || !state.email.includes("@"))
            setWarning("Please provide a valid email address");
        else if(!state.age || parseInt(state.age) <= 0)
           setWarning("Please provide a valid age");
        else if(!state.password || !state.passwordConfirm)
            setWarning("Please provide a password and confirm it");
        else if(state.password != state.passwordConfirm)
            setWarning("Passwords must match");
        else{
            setWarning("");
            attemptSignup(state);
        }    
    }

    const commonProps = {
        placeholderTextColor: "#707070",
        style: styles.inputs
    }

    return (
        <LinearGradient colors={["#FD9766", "#2D2920", "#2D2920"]}style={styles.wrapper}>
            <View style={styles.body}>
                <LogoCaption 
                    caption="Signup" 
                    style={{marginBottom: 60}}
                    />

                <TextInput
                    placeholder="Full name"
                    onSubmitEditing={() => {tiEmail.current.focus()}}
                    onChangeText={handleChange("name")}
                    {...commonProps}/>

                <TextInput
                    placeholder="Email"
                    ref={tiEmail}
                    onSubmitEditing={() => {tiAge.current.focus()}}
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    {...commonProps} />

                <TextInput
                    placeholder="Age"
                    keyboardType="number-pad"
                    ref={tiAge}
                    onSubmitEditing={() => {tiPassword.current.focus()}}
                    onChangeText={handleChange("age")}
                    {...commonProps} />

                <TextInput
                    placeholder="Password"
                    keyboardType="web-search"
                    secureTextEntry={true}
                    ref={tiPassword}
                    onSubmitEditing={() => {tiPasswordConfirm.current.focus()}}
                    onChangeText={handleChange("password")}
                    {...commonProps} />

                <TextInput
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    ref={tiPasswordConfirm}
                    onSubmitEditing={validateForm}
                    onChangeText={handleChange("passwordConfirm")}
                    {...commonProps}/>

                <Text style={styles.warningText}>{state.warning}</Text>
                <Text style={styles.errorText}>{state.error}</Text>
                <TouchableWithoutFeedback onPress={validateForm} style={{width: 200}}>
                    <Text style={styles.button}>Continue</Text>
                </TouchableWithoutFeedback>
            </View>
        </LinearGradient>
    )
}

export default SignUp;