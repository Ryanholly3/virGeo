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
  Picker,
  ImageBackground,
  TextInput
} from 'react-native';

import { AppConsumer } from './Context';
const gridBackground = require('./res/grid_background.png')

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      selectedUser: 'Ryan',
      loginForm: true,
      userNameField: '',
      passwordField: '',
      fullNameField: '',
    }
  }

  displayLogin = () =>{
    this.setState({
      loginForm: true
    })
  }

  displaySignup = () =>{
    this.setState({
      loginForm: false
    })
  }

  loginForm = () =>{
    if(this.state.loginForm === true){
      return(
        <View
          style={{
            width: '50%',
            height: '40%',
            backgroundColor: 'gray',
            borderColor: 'black',
            borderWidth: 3,
            flex: 0,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }} >
          <TextInput
            style={{
              height: 40,
              width: 180,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 2,
            }}
            placeholder={'Username'}
          />
          <TextInput
            style={{
              height: 40,
              width: 180,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 2,
            }}
            placeholder={'Password'}
          />
          <Picker
            selectedValue={this.state.selectedUser}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({selectedUser: itemValue})}>
            <Picker.Item label="Ryan" value={1} />
            <Picker.Item label="Logan" value={2} />
            <Picker.Item label="Stephan" value={3} />
          </Picker>
        </View>
      )
    }
  }

  signupForm = () =>{
    if(this.state.loginForm === false){
      return(
        <View style={{
          width: '50%',
          height: '40%',
          backgroundColor: 'gray',
          borderColor: 'black',
          borderWidth: 3,
          flex: 0,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
          }}
        >
          <TextInput
            style={{
              height: 40,
              width: 180,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 2,
            }}
            placeholder={'Full Name'}
          />
          <TextInput
            style={{
              height: 40,
              width: 180,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 2,
            }}
            placeholder={'Username'}
          />
          <TextInput
            style={{
              height: 40,
              width: 180,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 2,
            }}
            placeholder={'Password'}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <AppConsumer>
        {({ user, loggedIn, users, login }) => (
          <ImageBackground
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'stretch',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            source={gridBackground}
          >
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                height: 90,
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 70, fontWeight: 'bold', fontFamily: 'Helvetica' }}>
                VIR
              </Text>
              <Text style={{ fontSize: 70, fontWeight: 'bold', fontFamily: 'Helvetica', color: 'gray' }}>
                GEO
              </Text>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                height: 40,
                alignItems: 'center'
              }}
            >
              <Button title="Log in"  onPress={this.displayLogin}/>
              <Button title="Sign in" onPress={this.displaySignup}/>
            </View>
              { this.loginForm() }
              { this.signupForm() }
            <Button title="GO" onPress={() => login(2)} />
            <Text>
              { users && users[0] && users[0].user_name }
            </Text>
            <Text>
              { user && user[0] && user[0].user_name }
            </Text>
          </ImageBackground>
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
