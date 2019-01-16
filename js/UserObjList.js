'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  Text,
  View,
  Button,
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


class UserObjList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.profileListSelect === this.props.userObjectId){
      return (
        <AppConsumer>
          {({ profileListSelectFunc, objToDrop, dropObj, userLat, userLong }) => (
            <TouchableOpacity onPress={() => profileListSelectFunc(this.props.userObjectId)} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#9e9e9e'}}>
              { this.objIconRender(this.props.objectName) }
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectName}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectType}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </AppConsumer>
      );
    } else {
      return (
        <AppConsumer>
          {({ profileListSelectFunc }) => (
            <TouchableOpacity onPress={() => profileListSelectFunc(this.props.userObjectId)} style={{ flex: 1, justifyContent: 'space-between',flexDirection: 'row', backgroundColor: 'lightgray'}}>
              { this.objIconRender(this.props.objectName)}
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectName}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectType}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </AppConsumer>
      );
    }
  }

  objIconRender = (objectName) =>{
    if(objectName === 'gold'){
      return(
        <View style={styles.tableItem}>
          <Image
            style={styles.objectIcon}
            source={require(`./res/objIcons/goldCoin.png`)}
          />
        </View>
      )
    } else if (objectName === 'ruby'){
      return(
        <View style={styles.tableItem}>
          <Image
            style={styles.objectIcon}
            source={require(`./res/objIcons/ruby.png`)}
          />
        </View>
      )
    } else if (objectName === 'diamond'){
      return(
        <View style={styles.tableItem}>
          <Image
            style={styles.objectIcon}
            source={require(`./res/objIcons/diamond.png`)}
          />
        </View>
      )
    } else if (objectName === 'penny'){
      return(
        <View style={styles.tableItem}>
          <Image
            style={styles.objectIcon}
            source={require(`./res/objIcons/penny.png`)}
          />
        </View>
      )
    } else if (objectName === 'stick'){
      return(
        <View style={styles.tableItem}>
          <Image
            style={styles.objectIcon}
            source={require(`./res/objIcons/stick.png`)}
          />
        </View>
      )
    }
  }
}

var styles = StyleSheet.create({
tableItem : {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
textStyles : {
  fontSize: 15,
  letterSpacing: 1,
  fontFamily: 'Avenir',
  fontWeight: 'bold'
},
objectIcon : {
  resizeMode: 'contain',
  height: 40,
  width: 40,
},
dropObjButtonFlex : {
  borderWidth: 2,
  height: 35,
  width: 35,
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center'
},
dropObjButton : {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e53935',
},
})

export default UserObjList
