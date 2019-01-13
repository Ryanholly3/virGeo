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
  ImageBackground
} from 'react-native';

import { AppConsumer } from './Context';
import { Actions } from 'react-native-router-flux';
const gridBackground = require('./res/grid_background.png')


export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppConsumer>
        {({ user, objects, droppedObjs }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
          <View style={styles.titleBox}>
            <Text style={{ fontSize: 50, fontWeight: 'bold', fontFamily: 'Helvetica' }}>
              Hello,
            </Text><Text> </Text>
            <Text style={{ fontSize: 50, fontWeight: 'bold', fontFamily: 'Helvetica', color: 'gray' }}>
              {user[0].user_name}
            </Text><Text style={{ fontSize: 50, fontWeight: 'bold', fontFamily: 'Helvetica' }}>!</Text>
          </View>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleBox : {
    flex: 0,
    flexDirection: 'row',
    height: 90,
    alignItems: 'center'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
});
