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
  Button,
  ImageBackground,
  Image
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import { AppConsumer } from './Context';
const gridBackground = require('./res/grid_background.png')
import { Actions } from 'react-native-router-flux';

import DroppedObjList from './DroppedObjList';


var sharedProps = {
  apiKey:"912A3CB8-1A43-42D2-BFDF-2659B6DA962E",
}

var ARSceneScreen = require('./ARSceneScreen');

export default class DashboardScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      arOn: false,
      navError: false
    };

  }

  render() {
    if(!this.state.arOn){
      return this.dashboardMode();
    } else if (this.state.arOn === true){
      return this.getARNavigator()
    }
  }

  dashboardMode(){
    return (
      <AppConsumer>
        {({ avatar, trackObjToSearch, droppedObjs, organizedDroppedObjs, organizeDroppedObj, objToSearch, userLat, userLong, calculatedObjPos, listSelect }) => (
          <ImageBackground style={styles.gridBackground} source={gridBackground}>

            <View style={styles.header}>
              {this.renderAvatarDash(avatar)}
              <View style={styles.titleBox}>
                <Text style={styles.titleTextBlack}>
                  Items
                </Text>
                <Text style={styles.titleTextGray}>
                  Near You
                </Text>
              </View>
            </View>

            <View style={{ flex: 0, height: '60%', borderWidth: 3, borderRadius: 10, width:'80%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <View style={{ flex: 1, borderTopLeftRadius: 7, borderTopRightRadius: 7, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#2196f3'}}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Item Type
                  </Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>
                    Distance Away (m)
                  </Text>
                </View>
              </View>
              { this.makeTable(organizedDroppedObjs, listSelect) }
              { this.enterArButton(objToSearch, trackObjToSearch, userLat, userLong, calculatedObjPos) }
            </View>
          </ImageBackground>
        )}
      </AppConsumer>
    );
  }

  makeTable = (organizedDroppedObjs, listSelect) => {
    return organizedDroppedObjs.map((obj, i) => {
      return (
        <DroppedObjList
          key={i}
          objectId={obj.id}
          objectType={obj.object_info[0].category}
          distance={obj.distance}
          listSelect={listSelect}
        />
      )
    })
  }

  enterArButton = (objToSearch, trackObjToSearch, userLat, userLong, calculatedObjPos)=>{
    console.log('distance', objToSearch.distance)
    if(objToSearch.distance < 10000){
      return(
        <View style={styles.arButtonFlex}>
          <TouchableOpacity style={{width: '100%' }} onPress={() => this.enterAR(objToSearch, trackObjToSearch, userLat, userLong, calculatedObjPos)}>
            <View style={styles.arButton1}>
              <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>ENTER AR MODE</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.arButtonFlex}>
          <TouchableOpacity disabled={true} style={{width: '100%' }} onPress={() => this.enterAR(objToSearch, trackObjToSearch, userLat, userLong, calculatedObjPos)}>
            <View style={styles.arButton2}>
              <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>TOO FAR AWAY</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  getARNavigator() {
    return (
      <AppConsumer>
        {({ reorganizeDroppedObj, trackDistance, objToSearch, calculatedObjPos }) => (
          <View style={styles.flex}>
            <ViroARSceneNavigator
              apiKey="912A3CB8-1A43-42D2-BFDF-2659B6DA962E"
              initialScene={{scene: ARSceneScreen}}
              worldAlignment={"GravityAndHeading"}
              viroAppProps={{
                objToSearch: objToSearch,
                exitAr: this._exitAr
              }}
            />
            <View style={{flex: 0, flexDirection: 'row',}}>
              <View style={{flex: 1}}>
                  <View style={styles.arInfo}>
                    <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>Type: {objToSearch.object_info[0].category}</Text>
                    <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>Dist (m): {trackDistance.toFixed(1)} </Text>
                  </View>
              </View>
              <TouchableOpacity style={styles.exitButtonFlex} onPress={() => this._exitAr(reorganizeDroppedObj)}>
                <View style={styles.exitButton}>
                  <Text style={{color: 'white', fontSize: 18, letterSpacing: 1, fontFamily: 'Avenir'}}>EXIT AR MODE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }

  enterAR(objToSearch, trackObjToSearch, userLat, userLong, calculatedObjPos){
    console.log('objToSearch', objToSearch, 'userLat', userLat, 'userLong', userLong)

    var objLat = objToSearch.latitude
    var objLong = objToSearch.longitude


    this._mapVirtual(userLat, userLong, objLat, objLong)
      .then((objPos)=>{
        return calculatedObjPos(objPos)
      }).then(()=>{
        return trackObjToSearch(objToSearch)
      }).then(()=>{
        return this.setState({
          arOn: true,
        })
      })

  }

  _exitAr =(reorganizeDroppedObj) =>{

    reorganizeDroppedObj()
    this.setState({
      arOn: false,
    })
  }

  latLongToDistanceAway = (lat1, long1, lat2, long2) =>{
    var radiusEarth = 6371e3;

    //convert degrees to radians
    var lat1r = (lat1 * Math.PI)/180
    var lat2r = (lat2 * Math.PI)/180

    //difference lat and difference long in radians
    var dlat = (lat2 - lat1) * Math.PI / 180
    var dlong = (long2 - long1) * Math.PI / 180

    var a = Math.sin(dlat/2) * Math.sin(dlat/2) + Math.cos(lat1r) * Math.cos(lat2r) * Math.sin(dlong/2) * Math.sin(dlong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = radiusEarth * c
    return d

  }

  bearingPhoneToObj = (lat1, long1, lat2, long2) =>{
    //convert degrees to radians
    var lat1r = (lat1 * Math.PI)/180
    var lat2r = (lat2 * Math.PI)/180
    var long1r = (long1 * Math.PI)/180
    var long2r = (long2 * Math.PI)/180

    //difference in long in radians
    var dlong = ((long2 - long1) * Math.PI) / 180

    var y = Math.sin(dlong) * Math.cos(lat2r);
    var x = (Math.cos(lat1r) * Math.sin(lat2r)) - (Math.sin(lat1r) * Math.cos(lat2r) * Math.cos(dlong));
    var brng = (Math.atan2(y, x) * 180) / Math.PI
    brng = (brng + 360) % 360
    //returned in degrees between 0-360
    console.log('bearing', brng)
    return brng
  }

  _mapVirtual = async (userLat, userLong, objLat, objLong) => {

    let distBetweenPhoneObj = await this.latLongToDistanceAway(userLat, userLong, objLat, objLong)
    let headingPhoneToObj = await this.bearingPhoneToObj(userLat, userLong, objLat, objLong)

    let radiansPhoneToObj = (headingPhoneToObj * Math.PI) / 180


    //must invert Z because camera faces -Z
    let objZ = -1 * (Math.cos(radiansPhoneToObj) * distBetweenPhoneObj)
    let objX = Math.sin(radiansPhoneToObj) * distBetweenPhoneObj
    console.log('objZ', objZ, 'objX', objX)

    return {posX: objX, posZ: objZ, disPhoneObj: distBetweenPhoneObj}

    // let display = ` ${userLat} ${userLong} distBetweenPhoneObj: ${distBetweenPhoneObj}, headingPhoneToObj:
    // ${headingPhoneToObj}, objX: ${objX}, objZ: ${objZ}`
  }

  renderAvatarDash(avatar){
    if(avatar === 'alien'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/alien.png`)}
          />
        </View>
      )
    } else if (avatar === 'cactus'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cactus.png`)}
          />
        </View>
      )
    } else if (avatar === 'cerberus'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cerberus.png`)}
          />
        </View>
      )
    } else if (avatar === 'cow'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cow.png`)}
          />
        </View>
      )
    } else if (avatar === 'cricket'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/cricket.png`)}
          />
        </View>
      )
    } else if (avatar === 'death'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/death.png`)}
          />
        </View>
      )
    } else if (avatar === 'dinosaur'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/dinosaur.png`)}
          />
        </View>
      )
    } else if (avatar === 'dolphin'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/dolphin.png`)}
          />
        </View>
      )
    } else if (avatar === 'ghost'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/ghost.png`)}
          />
        </View>
      )
    } else if (avatar === 'robot'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/robot.png`)}
          />
        </View>
      )
    } else if (avatar === 'seagull'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/seagull.png`)}
          />
        </View>
      )
    } else if (avatar === 'shark'){
      return(
        <View style={styles.avatarTile}>
          <Image
            style={styles.avatar}
            source={require(`./res/avatars/shark.png`)}
          />
        </View>
      )
    } else if (avatar === 'squid'){
      return(
        <View style={styles.avatarTile}>
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
  flex : {
    flex: 1,
  },
  titleBox : {
    flex: 0,
    flexDirection: 'column',
    height: 110,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTextBlack : {
    fontSize: 45,
    letterSpacing: 1,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  titleTextGray : {
    fontSize: 45,
    letterSpacing: 1,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color: 'gray'
  },

  exitButtonFlex : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  arInfo : {
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  exitButton : {
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e53935',
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
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: 'white'
  },
  arButtonFlex : {
    height: 40,
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  arButton1 : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  arButton2 : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e53935',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  header : {
    flex: 0,
    height: 130,
    marginBottom: 20,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    height: 90,
    width: 90,
    margin: 10,
  },
  avatarTile : {
    flex: 0,
    height: 110,
    width: 110,
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },

});
