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
      userLatitude: null,
      userLongitude: null,

      arOn: false,
      user: '',
    };

    // this._exitAr = this._exitAr.bind(this);

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
        {({ user, findCoordinates, setCoordinates }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
            <Text>
              DASHBOARD
            </Text>
            <Button title="Enter AR" onPress={() => this.enterAr(findCoordinates)}/>
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
          viroAppProps={{
            latitude: this.state.userLatitude,
            longitude: this.state.userLongitude,
          }}
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          arOn: true
        })
      },
      (error) => this.setState({ navError: true }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
    )
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
