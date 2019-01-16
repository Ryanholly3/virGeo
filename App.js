'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import { AppProvider } from './js/Context';
import { Router, Scene, Tabs } from 'react-native-router-flux';

import ProfileScreen from './js/ProfileScreen';
import DashboardScreen from './js/DashboardScreen';
import LoginScreen from './js/LoginScreen';
import LogoutScreen from './js/LogoutScreen';


export default class App extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <AppProvider>
        <Router>
          <Scene
            key="root"
            headerMode="none"
          >
            <Scene
              key="login"
              component={LoginScreen}
              headerMode="none"
            />
            <Scene
              tabs={true}
              labelStyle={styles.tabBar}
              tabBarPosition="top"
              headerMode="none"
              key="tabbar"
              hideTabBar={false}
            >
              <Scene
                key="profile"
                component={ProfileScreen}
                headerMode="none"
              />
              <Scene
                key="dashboard"
                component={DashboardScreen}
                headerMode="none"
              />
              <Scene
                key="logout"
                component={LogoutScreen}
                headerMode="none"
              />
            </Scene>
          </Scene>
        </Router>
      </AppProvider>
    );
  }
}
var styles = StyleSheet.create({
  tabBar : {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1
  }
})
