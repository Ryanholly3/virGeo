'use strict'

import React, { Component } from 'react';
import {
  View,
  Text
} from "react-native";

import { AppProvider } from './js/Context';
import { Router, Scene } from 'react-native-router-flux';

import ProfileScreen from './js/ProfileScreen';
import DashboardScreen from './js/DashboardScreen';


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

export default class App extends Component{
  constructor(props){
    super(props)

  }

  render(){
    return (
      <AppProvider>
        <Router>
          <Scene key="root">
            {/* Tab Container */}
            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >
              {/* Tab and it's scenes */}
              <Scene key="osu" title="OSU" icon={TabIcon}>
                <Scene
                  key="profile"
                  component={ProfileScreen}
                  title="profile"
                />
                <Scene
                  key="dashboard"
                  component={DashboardScreen}
                  title="dashboard"
                />
              </Scene>
              {/* Removed for brevity */}
            </Scene>
          </Scene>
        </Router>
      </AppProvider>
    );
  }
}
