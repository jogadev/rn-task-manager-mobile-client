/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// Components
import WelcomeScreen from './src/components/main/WelcomeScreen'
import SignupScreen from "./src/components/signup/SignUpForm"
import ProfileScreen from './src/components/homeScreen/ProfileScreen';
import BlurryWait from "./src/components/common/UI/BlurryWait";
const stackOptions = {
  gestureDirection: "horizontal"
}

const App = () => {

  return (
    <NavigationContainer style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="Home" component={WelcomeScreen} options={stackOptions} />
          <Stack.Screen name="Signup" component={SignupScreen} options={stackOptions} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={stackOptions} />
        </Stack.Navigator>
      </SafeAreaView>
      <BlurryWait show={false} />
    </NavigationContainer>
  );
};



export default App;
