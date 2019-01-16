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
        {({ user, dropObj, avatar, objects, droppedObjs, profileListSelect }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>
            <View style={styles.titleBox}>
              <Text style={{ fontSize: 40, fontFamily: 'Avenir' }}>
                Hello,
              </Text><Text> </Text>
              <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Avenir', color: 'gray' }}>
                {user[0].user_name}
              </Text><Text style={{ fontSize: 40, fontFamily: 'Avenir' }}>!</Text>
            </View>
            <View style={styles.profileInfoCard}>
              { this.renderAvatar(avatar) }
              <View style={styles.profileInfo}>
                <Text style={{fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>
                  Name: {user[0].full_name}
                </Text>
                <Text style={{fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>
                  Level: {user[0].level}
                </Text>
                <Text style={{fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>
                  Character: {avatar}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.objectTitle}>
                Your Collection
              </Text>
            </View>
            <View style={styles.inventoryTable}>
              <View style={styles.inventoryHeader}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Item
                  </Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Name
                  </Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Type
                  </Text>
                </View>
              </View>
              { this.makeTable(user, profileListSelect) }
              <View style={styles.dropButtonFlex}>
                <TouchableOpacity style={{width: '100%'}} onPress={() => this.dropObj(user, profileListSelect, dropObj)}>
                  <View style={styles.dropButton}>
                    <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>DROP OBJECT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <ImageBackground style={styles.avatarWindow} source={gridBackground}>

                  <View>
                    <Text style={styles.titleText}>Character Selection</Text>

                    <View style={styles.avatarCard}>
                      <View style={styles.avatarTrio}>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/alien.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            alien
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/cactus.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            cactus
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/cerberus.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            cerberus
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.avatarTrio}>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/cow.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            cow
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/cricket.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            cricket
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/death.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            death
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.avatarTrio}>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/dinosaur.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            dinosaur
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/dolphin.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            dolphin
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/ghost.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            ghost
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.avatarTrio}>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/robot.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            robot
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/seagull.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            seagull
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarItem}>
                          <Image
                            style={styles.avatarModal}
                            source={require(`./res/avatars/shark.png`)}
                          />
                          <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Avenir'}}>
                            shark
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{flex: 0, flexDirection: 'row',}}>
                      <TouchableOpacity style={styles.exitButtonFlex} onPress={()=> this.setModalVisible(!this.state.modalVisible)}>
                        <View style={styles.exitButton}>
                          <Text style={{color: 'white', letterSpacing: 1, fontFamily: 'Avenir'}}>EXIT</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                </ImageBackground>
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
          objectType={obj.category}
          profileListSelect={profileListSelect}
        />
      )
    })
  }

  dropObj = (user, profileListSelect, dropObj) =>{
    let obj = user[0].objects
    let objId;

    for(let i= 0; i < obj.length;i++){
      if(obj[i].user_object_id === profileListSelect){
        objId = obj[i].object_id
      }
    }
    dropObj(profileListSelect, objId)
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
    color:'black',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign:'center',
    fontSize : 40
  },
  profileInfoCard : {
    width: '80%',
    height: '25%',
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  profileInfo : {
    height: 100,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatar: {
    height: 110,
    width: 110,
    margin: 5,
  },
  avatarModal: {
    height: 60,
    width: 60,
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
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'gray',
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 350,
    height: 520,
  },
  avatarTrio:{
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  avatarItem : {
    flex: 0,
    height: 110,
    width: 90,
    borderWidth: 2,
    borderRadius: 10,

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
    backgroundColor: '#2196f3',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  objectTitle : {
    letterSpacing: 5,
    fontSize: 25,
    fontFamily: 'Avenir',
    marginTop: 20,
    fontWeight: 'bold',
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
    letterSpacing: 1,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Avenir'
  },
  dropButtonFlex : {
    height: 40,
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropButton : {
    flex: 1,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e53935',
  },
  inventoryTable : {
    flex: 0,
    height: '40%',
    borderWidth: 3,
    borderRadius: 10,
    width:'80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inventoryHeader : {
    flex: 0,
    height: 40,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#2196f3'
  },

});
