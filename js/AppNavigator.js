import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";

import LoginScreen from './LoginScreen'
import ProfileScreen from './ProfileScreen'
import DashboardScreen from './DashboardScreen'

const AppStackNavigator = createMaterialTopTabNavigator(
  {
    Login: LoginScreen,
    Profile: ProfileScreen,
    Dashboard: DashboardScreen
  },{
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    }
  }
)

export default createAppContainer(AppStackNavigator)
