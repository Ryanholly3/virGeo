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
  ImageBackground,
  Image,
  ScrollView,
  Modal
} from 'react-native';

import { AppConsumer } from './Context';
import { Actions } from 'react-native-router-flux';
const gridBackground = require('./res/grid_background.png')

import UserObjList from './UserObjList';


export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
              { this.renderAvatar(avatar) }
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
            <View>
              <Text style={styles.objectTitle}>
                Your Objects
              </Text>
            </View>
            <View style={{ flex: 0, height: '20%', width:'80%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <View style={{ flex: 0, height: 40, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'blue'}}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Object
                  </Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Name
                  </Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Drop Object
                  </Text>
                </View>
              </View>
              { this.makeTable(user, profileListSelect) }
            </View>

              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.avatarWindow}>
                  <View>
                    <Text>Avatar Selection</Text>

                    <View style={styles.avatarCard}>
                      <View style={styles.avatarItem}>
                        <Image
                          style={styles.avatar}
                          source={require(`./res/avatars/ghost.png`)}
                        />
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                          {avatar}
                        </Text>
                      </View>
                    </View>

                    <View style={{flex: 0, flexDirection: 'row',}}>
                      <TouchableOpacity style={styles.exitButtonFlex} onPress={()=> this.setModalVisible(!this.state.modalVisible)}>
                        <View style={styles.exitButton}>
                          <Text style={{color: 'white'}}>EXIT Avatar Selection</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </Modal>

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
          userObjectId={obj.user_object_id}
          objectName={obj.object_name}
          profileListSelect={profileListSelect}
        />
      )
    })
  }

  renderAvatar = (avatar) =>{
    if(avatar === 'alien'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/alien.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'cactus'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cactus.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'cerberus'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cerberus.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'cow'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cow.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'cricket'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cricket.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'death'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/death.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'dinosaur'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/dinosaur.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'dolphin'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/dolphin.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'ghost'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/ghost.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'robot'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/robot.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'seagull'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/seagull.png`)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'shark'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/shark.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      )
    } else if (avatar === 'squid'){
      return(
        <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/squid.png`)}
            onClick={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
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
    height: 80,
    width: 80,
    margin: 10,
  },
  avatarWindow : {
    width: '100%',
    height: '100%',
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCard : {
    backgroundColor: 'blue',
    width: '80%',
    height: '60%',
  },
  avatarItem : {
    flex: 0,
    height: 120,
    width: 120,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },

  exitButtonFlex : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  exitButton : {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  objectTitle : {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginTop: 20,
    marginBottom: 20
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
