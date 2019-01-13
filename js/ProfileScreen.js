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
  ImageBackground,
  Image
} from 'react-native';

import { AppConsumer } from './Context';
import { Actions } from 'react-native-router-flux';
const gridBackground = require('./res/grid_background.png')

import UserObjList from './UserObjList';


export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppConsumer>
        {({ user, avatar, objects, droppedObjs, profileListSelect }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
          <View style={styles.titleBox}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Helvetica' }}>
              Hello,
            </Text><Text> </Text>
            <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Helvetica', color: 'gray' }}>
              {user[0].user_name}
            </Text><Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Helvetica' }}>!</Text>
          </View>
          <View style={styles.profileInfoCard}>
            { this.renderImage(avatar) }
            <View style={styles.profileInfo}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Name: {user[0].full_name}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Level: {user[0].level}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Avatar: {avatar}
              </Text>
            </View>
          </View>
          <View style={{ flex: 0, height: '40%', width:'80%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'blue'}}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>
                  Image
                </Text>
              </View>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>
                  Object Name
                </Text>
              </View>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>
                  Date Picked Up
                </Text>
              </View>
            </View>
            { this.makeTable(user, profileListSelect) }
          </View>
          </ImageBackground>
        )}
      </AppConsumer>
    );
  }

  makeTable = (user, profileListSelect) => {
    let userObjects = user[0].objects

    return userObjects.map((obj, i) => {
      return (
        <UserObjList
          key={i}
          objectId={obj.object_id}
          objectName={obj.object_name}
          profileListSelect={profileListSelect}
        />
      )
    })
  }

  renderImage = (avatar) =>{
    if(avatar === 'alien'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/alien.png`)}
        />
      )
    } else if (avatar === 'cactus'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/cactus.png`)}
        />
      )
    } else if (avatar === 'cerberus'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/cerberus.png`)}
        />
      )
    } else if (avatar === 'cow'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/cow.png`)}
        />
      )
    } else if (avatar === 'cricket'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/cricket.png`)}
        />
      )
    } else if (avatar === 'death'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/death.png`)}
        />
      )
    } else if (avatar === 'dinosaur'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/dinosaur.png`)}
        />
      )
    } else if (avatar === 'dolphin'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/dolphin.png`)}
        />
      )
    } else if (avatar === 'ghost'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/ghost.png`)}
        />
      )
    } else if (avatar === 'robot'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/robot.png`)}
        />
      )
    } else if (avatar === 'seagull'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/seagull.png`)}
        />
      )
    } else if (avatar === 'shark'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/shark.png`)}
        />
      )
    } else if (avatar === 'squid'){
      return(
        <Image
          style={styles.avatar}
          source={require(`./res/avatars/squid.png`)}
        />
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
  titleBox : {
    flex: 0,
    flexDirection: 'row',
    height: 90,
    alignItems: 'center'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  profileInfoCard : {
    width: '80%',
    height: '20%',
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderWidth: 3,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  profileInfo : {
    height: 80,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 10,
  },
  tableHeader : {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText : {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
});
