import React from "react";
import {View, Text} from "react-native";

function Profile({route, navigation}){
    return (
        <View>
            <Text>This is your profile</Text>
            <Text>Token: {route.params.token}</Text>
        </View>
    )
}

export default Profile;