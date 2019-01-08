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

import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class LoginScreen extends Component {

  static navigationOptions = {
    header: 'none'
  }

  constructor() {
    super();
    // Set initial state here
    this.state = {
      logIn: false,
    };
  }



  signInForm =()=>{
    this.setState({
      logIn: false
    })
  }

  logInForm =()=>{
    this.setState({
      logIn: true
    })
  }

  logIn = () =>{
    this.props.navigation.navigate('Profile')
  }

  render() {
    return (
      <View style={styles.outer} >
        <Button title="Log in" onPress={this.logInForm} />
        <Button title="Sign in" onPress={this.signInForm} />
        <Button title="GO" onPress={this.logIn} />
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
