'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  ImageBackground
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import { AppConsumer } from './Context';
const gridBackground = require('./res/grid_background.png')
import { Actions } from 'react-native-router-flux';


var sharedProps = {
  apiKey:"912A3CB8-1A43-42D2-BFDF-2659B6DA962E",
}

var ARSceneScreen = require('./ARSceneScreen');

export default class DashboardScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      viroAppProps: {_exitAr: this._exitAr},
      arOn: false,
      user: '',
    };

    this._exitAr = this._exitAr.bind(this);

  }

  render() {
    if(!this.state.arOn){
      return this.dashboardMode();
    } else if (this.state.arOn === true){
      return this.getARNavigator()
    }
  }

  dashboardMode(){
    return (
      <AppConsumer>
        {({ user }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
            <Text>
              DASHBOARD
            </Text>
            <Button title="Enter AR" onPress={() => this.enterAr() }/>
          </ImageBackground>
        )}
      </AppConsumer>
    );
  }

  getARNavigator() {
    return (
      <View style={styles.flex}>
        <ViroARSceneNavigator
          apiKey="912A3CB8-1A43-42D2-BFDF-2659B6DA962E"
          initialScene={{scene: ARSceneScreen}}
          worldAlignment={"GravityAndHeading"}
        />
        <View style={{flex: 0, flexDirection: 'row',}}>
          <TouchableOpacity style={styles.exitButtonFlex} onPress={() => this._exitAr()}>
            <View style={styles.exitButton}>
              <Text style={{color: 'white'}}>EXIT AR MODE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  enterAr(){
    this.setState({
      arOn: true
    })
  }

  _exitAr(){
    this.setState({
      arOn: false
    })
  }

}

var styles = StyleSheet.create({
  gridBackground :{
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flex : {
    flex: 1,
  },
  exitButtonFlex : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  exitButton : {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
