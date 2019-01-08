'use strict'

import React, { Component } from 'react';
import {
  View,
  Text
} from "react-native";

import { AppProvider, AppConsumer } from './js/Context';
import { Router, Scene, Tabs } from 'react-native-router-flux';

import ProfileScreen from './js/ProfileScreen';
import DashboardScreen from './js/DashboardScreen';
import LoginScreen from './js/LoginScreen';


export default class App extends Component{
  constructor(props){
    super(props)

  }

  render(){

    return (
      <AppProvider>
        <AppConsumer>
          {({ loggedIn }) =>(
            <Router>
              <Scene
                key="root"
                headerMode="none"
              >
                <Scene
                  tabs={true}
                  tabBarPosition="top"
                  headerMode="none"
                  key="tabbar"
                  hideTabBar={!loggedIn}
                >
                  <Scene
                    key="login"
                    component={LoginScreen}
                    headerMode="none"
                    initial={true}
                  />
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
                </Scene>
              </Scene>
            </Router>
          )}
        </AppConsumer>
      </AppProvider>
    );
  }
}
