import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, requireNativeComponent } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FontAwesome} from '@expo/vector-icons';
import reactDom from 'react-dom';

import Comment from "../../screens/Comment/Comment";
import UserProfile from "../../screens/UserProfile/UserProfile";
import Home from "../../screens/Home/Home";

const Stack = createNativeStackNavigator()

class HomeNavigation extends Component {
// Esta es la navigation de todo lo que se puede hacer desde el home
    render() {
        return (
            <Stack.Navigator style={styles.tab}>
                <Stack.Screen   
                name="Home"
                component={Home} 
                options={{ 
                    headerShown:false,
                }}
                />
                <Stack.Screen   
                name="Comment"
                component={Comment} 
                options={{ 
                    headerShown:false,
                }}
                />
                <Stack.Screen   
                name="UserProfile"
                component={UserProfile} 
                options={{ 
                    headerShown:false,
                }}
                />
            </Stack.Navigator>
        
        )
    }
    
}

const styles = StyleSheet.create({
    tab: {
        position: "absolute",
    }
})

export default HomeNavigation;