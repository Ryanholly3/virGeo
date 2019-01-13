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
  ImageBackground
} from 'react-native';

import { AppConsumer } from './Context';
import { Actions } from 'react-native-router-flux';
const gridBackground = require('./res/grid_background.png')


class UserObjList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.profileListSelect === this.props.objectId){
      return (
        <AppConsumer>
          {({ profileListSelectFunc, objToDrop, userLat, userLong }) => (
            <TouchableOpacity onPress={() => profileListSelectFunc(this.props.objectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'gray'}}>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  image!
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectName}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  Date
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
            <TouchableOpacity onPress={() => profileListSelectFunc(this.props.objectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'lightgray'}}>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  image!
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.objectName}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  Date
                </Text>
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
})

export default UserObjList
