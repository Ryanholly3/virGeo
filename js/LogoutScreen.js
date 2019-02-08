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
  ImageBackground,
  Image
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
        {({ user, avatar, users, logOut, logIn }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
            <View style={styles.logoutPage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Are you sure you'd like to </Text>
                <View style={styles.mixedTextLine}>
                  <Text style={styles.title}> logout, </Text>
                  <Text style={styles.titleGray}>{user[0].user_name}</Text>
                  <Text style={styles.title}>?</Text>
                </View>
              </View>
              { this.renderAvatar(avatar) }
              <View style={styles.logOutButtonFlex}>
                <TouchableOpacity style={{width: '100%'}} onPress={() => logOut()}>
                  <View style={styles.logOutButton}>
                    <Text style={styles.buttonText}>Yes plz</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      </AppConsumer>
    );
  }


  renderAvatar = (avatar) =>{
    if(avatar === 'alien'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/alien.png`)}
          />
        </View>
      )
    } else if (avatar === 'cactus'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cactus.png`)}
          />
        </View>
      )
    } else if (avatar === 'cerberus'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cerberus.png`)}
          />
        </View>
      )
    } else if (avatar === 'cow'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cow.png`)}
          />
        </View>
      )
    } else if (avatar === 'cricket'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cricket.png`)}
          />
        </View>
      )
    } else if (avatar === 'death'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/death.png`)}
          />
        </View>
      )
    } else if (avatar === 'dinosaur'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/dinosaur.png`)}
          />
        </View>
      )
    } else if (avatar === 'dolphin'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/dolphin.png`)}
          />
        </View>
      )
    } else if (avatar === 'ghost'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/ghost.png`)}
          />
        </View>
      )
    } else if (avatar === 'robot'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/robot.png`)}
          />
        </View>
      )
    } else if (avatar === 'seagull'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/seagull.png`)}
          />
        </View>
      )
    } else if (avatar === 'shark'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/shark.png`)}
          />
        </View>
      )
    } else if (avatar === 'squid'){
      return(
        <View>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/squid.png`)}
          />
        </View>
      )
    }
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
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  mixedTextLine : {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto'
  },
  title : {
    letterSpacing: 1,
    fontSize: 25,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleGray : {
    letterSpacing: 1,
    fontSize: 25,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: 'gray'
  },
  avatar: {
    height: 110,
    width: 110,
    margin: 5,
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
