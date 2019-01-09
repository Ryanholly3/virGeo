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


export default class LogoutScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppConsumer>
        {({ user }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
            <View>
              <Text>
                Logout?
              </Text>
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
    resizeMode: 'stretch',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
});
