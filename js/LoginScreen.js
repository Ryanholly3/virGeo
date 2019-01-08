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
  Button
} from 'react-native';

import { AppConsumer } from './Context';

export default class LoginScreen extends Component {

  constructor() {
    super();
    // Set initial state here
    this.state = {
      logIn: false,
    };
  }

  render() {
    return (
      <AppConsumer>
        {({ user, loggedIn, users }) => (
          <View style={styles.outer} >
            <Button title="Log in" onPress={this.logInForm} />
            <Button title="Sign in" onPress={this.signInForm} />
            <Button title="GO" onPress={this.logIn} />
            <Text>
              { users && users[0] && users[0].user_name }
            </Text>
          </View>
        )}
      </AppConsumer>
    );
  }
}

var styles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    color: "black",
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "white",
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
