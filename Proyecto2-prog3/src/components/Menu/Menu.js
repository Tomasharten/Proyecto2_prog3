import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome} from '@expo/vector-icons';

import Home from "../../screens/Home/Home";
import Profile from "../../screens/Profile/Profile";
import NewPost from "../../screens/NewPost/NewPost";
import Buscador from "../../screens/Buscador/Buscador";

import reactDom from 'react-dom';

const Tab = createBottomTabNavigator();

class Menu extends Component {

    render() {
        return (

        <NavigationContainer>
            <Tab.Navigator style={styles.tab}>
                <Tab.Screen   
                name="Home"
                component={Home} 
                options={{ 
                    tabBarIcon:() => <FontAwesome name="home" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'Home' 
                }}
                />
                <Tab.Screen   
                name="Buscador"
                component={Buscador} 
                options={{ 
                    tabBarIcon:() => <FontAwesome name="search" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'Buscador' 
                }}
                />
                <Tab.Screen   
                name="NewPost"
                component={NewPost} 
                options={{ 
                    tabBarIcon:() => <FontAwesome name="camera" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'NewPost' 
                }}
                />
                <Tab.Screen   
                name="Profile"
                component={Profile} 
                options={{ 
                    tabBarIcon:() => <FontAwesome name="user" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'Profile' 
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
        )
    }
    
}

const styles = StyleSheet.create({
    tab: {
        position: "absolute",
    }
})

export default Menu;