import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../../screens/Home/Home";
import UserProfile from "../../screens/UserProfile/UserProfile";
import NewPost from "../../screens/NewPost/NewPost";
// import Filtrado from "../../screens/Filtrado/Filtrado";
import reactDom from 'react-dom';

const Tab = createBottomTabNavigator();

class Menu extends Component {

    render() {
        return (


            <Tab.Navigator style={styles.tab}>
                <Tab.Screen options={{ title: 'Home' }} name="Home" component={Home} />
                <Tab.Screen options={{ title: 'Nuevo Post' }} name="PostForm" component={NewPost} />
                <Tab.Screen options={{ title: 'Mi Perfil' }} name="Mi Perfil" component={UserProfile} />
                {/* <Tab.Screen options={{ title: 'Filtrado' }} name="Filtrado" component={Filtrado} /> */}
            </Tab.Navigator>

        )
    }
}

const styles = StyleSheet.create({
    tab: {
        position: "absolute",
    }
})

export default Menu;