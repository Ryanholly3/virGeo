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
              <View style={styles.loginGray}>
                <Text style={styles.logSignText}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%'}} onPress={this.displaySignup}>
            <View style={styles.signupWhite}>
              <Text style={styles.logSignText}>Signup</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={styles.userPassBox}>
            <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
              <Text style={styles.boxText}>Username</Text>
            </View>
            <TextInput style={styles.textInputBox} placeholder={' enter username'} />
            <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
              <Text style={styles.boxText}>Password</Text>
            </View>
            <TextInput style={styles.textInputBox} placeholder={' enter password'}/>
          </View>
          <View style={styles.goButtonFlex}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => logIn(1)}>
              <View style={styles.goButton}>
                <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir', fontWeight: 'bold'}}>GO</Text>
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
              <View style={styles.loginWhite}>
                <Text style={styles.logSignText}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%'}} onPress={this.displaySignup}>
            <View style={styles.signupGray}>
              <Text style={styles.logSignText}>Signup</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
            <Text style={styles.boxText}>Full Name</Text>
          </View>
          <TextInput style={styles.textInputBox} placeholder={' enter full name'}/>
          <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
            <Text style={styles.boxText}>Username</Text>
          </View>
          <TextInput style={styles.textInputBox} placeholder={' enter username'} />
          <View style={{height: 30, width: 200, flex: 0, justifyContent: 'center'}}>
            <Text style={styles.boxText}>Password</Text>
          </View>
          <TextInput style={styles.textInputBox} placeholder={' enter username'}/>
          <View style={styles.goButtonFlex}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => logIn(1)}>
              <View style={styles.goButton}>
                <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir', fontWeight: 'bold'}}>GO</Text>
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
              <Text style={{ fontSize: 75, fontWeight: 'bold', letterSpacing: 2, fontFamily: 'Avenir' }}>
                VIR
              </Text>
              <Text style={{ fontSize: 75, fontWeight: 'bold', letterSpacing: 2, fontFamily: 'Avenir', color: 'gray' }}>
                GEO
              </Text>
            </View>
            <View style={styles.captionBox}>
              <Text style={{fontSize: 20, letterSpacing: 1, fontFamily: 'Avenir'}}>a </Text><Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 1, fontFamily: 'Avenir'}}>vir</Text><Text style={{fontSize: 20, letterSpacing: 1, fontFamily: 'Avenir'}}>tual </Text>
              <Text style={{ fontSize: 20, color: 'gray', letterSpacing: 1, fontWeight: 'bold', letterSpacing: 1, fontFamily: 'Avenir'}}>geo</Text>
              <Text style={{fontSize: 20, letterSpacing: 1, fontFamily: 'Avenir'}}>
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
    width: '70%',
    height: '50%',
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  loginSigninFlex : {
    marginTop: 20,
    height: 40,
    width: 220,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logSignText : {
    color: '#2196f3',
    letterSpacing: 1,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  boxText : {
    color: 'black',
    fontFamily: 'Avenir',
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold'
  },
  loginGray : {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  signupWhite : {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  signupGray : {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  loginWhite : {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInputBox : {
    height: 40,
    width: 220,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
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
    height: 40,
    width: 220,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  goButton : {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196f3',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
});
