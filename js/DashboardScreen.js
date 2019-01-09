'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Button,
  ImageBackground
} from 'react-native';

import { AppConsumer } from './Context';
const gridBackground = require('./res/grid_background.png')


export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      user: ''
    };

  }

  render() {
    return (
      <AppConsumer>
        {({ user }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
            <Text>
              DASHBOARD
            </Text>
          </ImageBackground>
        )}
      </AppConsumer>
    );
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
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff'
   },
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  map: {
    width: 200,
    height: 300,
    flex: 1
    }
});
