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
            <View style={styles.logoutPage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  Are you sure you'd like to log out?
                </Text>
              </View>
              <View style={styles.logOutButtonFlex}>
                <TouchableOpacity style={{width: '100%'}} onPress={() => logOut()}>
                  <View style={styles.logOutButton}>
                    <Text style={styles.buttonText}>Log out</Text>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutPage : {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer : {
    width: '80%'
  },
  title : {
    letterSpacing: 5,
    fontSize: 25,
    fontFamily: 'Avenir',
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
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
    backgroundColor: 'lightgray',
  },
  buttonText : {
    color: 'black',
    letterSpacing: 1,
    fontSize: 18,
    fontFamily: 'Avenir',
  },
});
