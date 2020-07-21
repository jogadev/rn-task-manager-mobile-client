import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

const styles = StyleSheet.create({
    wrapper: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    blurView: {
        flex: 1,
    },
    text: {
        position: "absolute",
        width: "100%",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 25,
        flex: 0
    },
})

function BlurryWait({ show }) {
    if (show)
        return (
            <View style={styles.wrapper}>
                <BlurView
                    blurType="dark"
                    blurAmount={15}
                    style={styles.blurView}/>
                <Text style={styles.text}>Please wait...</Text>
            </View>
        )
    else
        return null
}

export default BlurryWait