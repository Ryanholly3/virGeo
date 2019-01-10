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
        {({ user, users, logOut, logIn }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
            <View>
              <Text>
                Are you sure you'd like to log out?
              </Text>
              <View style={styles.logOutButtonFlex}>
                <TouchableOpacity style={{width: '100%'}} onPress={() => logOut()}>
                  <View style={styles.logOutButton}>
                    <Text style={{color: 'white'}}>Log out</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  logOutButtonFlex : {
    marginTop: 10,
    borderWidth: 2,
    height: 40,
    width: 200,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logOutButton : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});
