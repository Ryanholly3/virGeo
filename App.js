import React, { Component } from 'react';
import { View, Text } from "react-native";
import {
  createMaterialTopTabNavigator, createAppContainer
} from 'react-navigation';



class App extends React.Component {
  render() {
    return (
      <TabNavigator />
    );
  }
}

import ProfileScreen from './js/ProfileScreen'
import DashboardScreen from './js/DashboardScreen'
import LoginScreen from './js/LoginScreen'

const TabNavigator = createMaterialTopTabNavigator({
  Login: { screen: LoginScreen},
  Profile: { screen: ProfileScreen },
  Dashboard: {screen: DashboardScreen },
},
{
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default createAppContainer(TabNavigator)
