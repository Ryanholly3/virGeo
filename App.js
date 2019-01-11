'use strict'

import React, { Component } from 'react';
import {
  View,
  Text
} from "react-native";

import { AppProvider, AppConsumer, AppContext } from './js/Context';
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
        <AppConsumer>
          {({ loggedIn, users, login }) =>(
            <Router>
              <Scene
                key="root"
                headerMode="none"
              >
                <Scene
                  key="login"
                  component={LoginScreen}
                  headerMode="none"
                  initial={true}
                />
                <Scene
                  tabs={true}
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
          )}
        </AppConsumer>
      </AppProvider>
    );
  }
}
