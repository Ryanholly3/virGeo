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


export default class LoginScreen extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      logIn: true,
    };
  }

  signIn =()=>{
    this.setState({
      logIn: false
    })
  }

  logIn =()=>{
    this.setState({
      logIn: true
    })
  }

  render() {
    return (
      <View style={styles.outer} >
        <Button title="Log in" onPress={this.logIn} />
        <Button title="Sign in" onPress={this.signIn} />
      </View>
    );
  }

}

var styles = StyleSheet.create({
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
});
