import React from "react";
import {View, Image, Text, Stylesheet} from "react-native"

function LogoCaption(props){
    const logoHeight = props.logoHeight || 120;
    const captionStyle = props.captionStyle || {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
    };
    return (
        <View style={props.style}>
            <Image source={require('../../assets/img/tick.png')} style={{resizeMode: "contain", height: logoHeight}} />
            <Text style={captionStyle}>{props.caption}</Text>
        </View>
    )
}

export default LogoCaption;