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


class DroppedObjList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var tooFar;
    if(this.props.distance < 900){
      tooFar = false
    } else {
      tooFar = true
    }

    if(this.props.listSelect === this.props.objectId){
      return (
        <AppConsumer>
          {({ listSelectFunc, objToSearch, calculatedObjPos }) => (
            <TouchableOpacity onPress={() => listSelectFunc(this.props.objectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'gray'}}>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.latitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.longitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.distance.toFixed(1)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </AppConsumer>
      );
    } else {
      return (
        <AppConsumer>
          {({ listSelectFunc }) => (
            <TouchableOpacity onPress={() => listSelectFunc(this.props.objectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'lightgray'}}>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.latitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.longitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text style={styles.textStyles}>
                  {this.props.distance.toFixed(1)}
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

export default DroppedObjList
