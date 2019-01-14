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
            <TouchableOpacity onPress={() => profileListSelectFunc(this.props.userObjectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'gray'}}>
              <View style={styles.tableItem}>
                <Image
                  style={styles.objectIcon}
                  source={require(`./res/objIcons/goldCoin.png`)}
                />
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectName}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <View style={styles.dropObjButtonFlex}>
                  <TouchableOpacity style={{width: '100%'}} onPress={() => dropObj(this.props.userObjectId, this.props.objectId)}>
                    <View style={styles.dropObjButton}>
                      <Text style={{color: 'white'}}>Drop</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </AppConsumer>
      );
    } else {
      return (
        <AppConsumer>
          {({ profileListSelectFunc }) => (
            <TouchableOpacity onPress={() => profileListSelectFunc(this.props.userObjectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'lightgray'}}>
              <View style={styles.tableItem}>
                <Image
                  style={styles.objectIcon}
                  source={require(`./res/objIcons/goldCoin.png`)}
                />
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectName}
                </Text>
              </View>
              <View style={styles.tableItem}>
              </View>
            </TouchableOpacity>
          )}
        </AppConsumer>
      );
    }
  }
}

var styles = StyleSheet.create({
tableItem : {
  flex: 1,
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center'
},
textStyles : {
  fontSize: 15,
},
objectIcon : {
  height: 30,
  width: 30
},
dropObjButtonFlex : {
  borderWidth: 2,
  height: 40,
  width: 40,
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center'
},
dropObjButton : {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
},
})

export default UserObjList
