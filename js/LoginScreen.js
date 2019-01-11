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
  TouchableOpacity,
  Button,
  Picker,
  ImageBackground,
  TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { AppConsumer } from './Context';
const gridBackground = require('./res/grid_background.png')

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      selectedUser: 1,
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

  loginForm = (logIn) =>{
    if(this.state.loginForm === true){
      return(
        <View style={styles.loginSignupCard}>
          <View style={styles.loginSigninFlex}>
            <TouchableOpacity style={{width: '50%'}} onPress={this.displayLogin}>
              <View style={styles.buttonGray}>
                <Text style={{color: 'blue'}}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%'}} onPress={this.displaySignup}>
            <View style={styles.buttonWhite}>
              <Text style={{color: 'blue'}}>Signup</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={styles.userPassBox}>
            <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
              <Text>Username</Text>
            </View>
            <TextInput style={styles.textInputBox} placeholder={' enter username'} />
            <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
              <Text>Password</Text>
            </View>
            <TextInput style={styles.textInputBox} placeholder={' enter password'}/>
          </View>
          <View style={styles.goButtonFlex}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => logIn(1)}>
              <View style={styles.goButton}>
                <Text style={{color: 'white'}}>GO</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  signupForm = (logIn) =>{
    if(this.state.loginForm === false){
      return(
        <View style={styles.loginSignupCard}>
          <View style={styles.loginSigninFlex}>
            <TouchableOpacity style={{width: '50%'}} onPress={this.displayLogin}>
              <View style={styles.buttonWhite}>
                <Text style={{color: 'blue'}}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%'}} onPress={this.displaySignup}>
            <View style={styles.buttonGray}>
              <Text style={{color: 'blue'}}>Signup</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
            <Text>Full Name</Text>
          </View>
          <TextInput style={styles.textInputBox} placeholder={' enter full name'}/>
          <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
            <Text>Username</Text>
          </View>
          <TextInput style={styles.textInputBox} placeholder={' enter username'} />
          <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
            <Text>Password</Text>
          </View>
          <TextInput style={styles.textInputBox} placeholder={' enter username'}/>
          <View style={styles.goButtonFlex}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => logIn(1)}>
              <View style={styles.goButton}>
                <Text style={{color: 'white'}}>GO</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <AppConsumer>
        {({ user, loggedIn, users, logIn }) => (
          <ImageBackground
            style={styles.gridBackground}
            source={gridBackground}
          >
            <View style={styles.titleBox}>
              <Text style={{ fontSize: 70, fontWeight: 'bold', fontFamily: 'Helvetica' }}>
                VIR
              </Text>
              <Text style={{ fontSize: 70, fontWeight: 'bold', fontFamily: 'Helvetica', color: 'gray' }}>
                GEO
              </Text>
            </View>
            <View style={styles.captionBox}>
              <Text>a </Text><Text style={{fontWeight: 'bold'}}>vir</Text><Text>tual </Text>
              <Text style={{color: 'gray', fontWeight: 'bold'}}>geo</Text>
              <Text>
                caching app
              </Text>
            </View>
              { this.loginForm(logIn) }
              { this.signupForm(logIn) }
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
  captionBox : {
    flex: 0,
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  loginSignupCard : {
    width: '60%',
    height: '50%',
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 3,
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  loginSigninFlex : {
    marginTop: 20,
    borderWidth: 2,
    height: 40,
    width: 200,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonGray : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  buttonWhite : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInputBox : {
    height: 40,
    width: 200,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  userPassBox : {
    height: 80,
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'

  },
  goButtonFlex : {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    height: 40,
    width: 200,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  goButton : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
});
