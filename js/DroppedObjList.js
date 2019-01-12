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
          {({ setObjToSearch, objToSearch, calculatedObjPos, listSelectFunc }) => (
            <TouchableOpacity onPress={() => listSelectFunc(this.props.objectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'gray'}}>
              <View style={styles.tableItem}>
                <Text>
                  {this.props.latitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text>
                  {this.props.longitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text>
                  {this.props.distance.toFixed(1)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                { this.closeEnoughForAr(tooFar, this.props.enterAR, objToSearch, calculatedObjPos) }
              </View>
            </TouchableOpacity>
          )}
        </AppConsumer>
      );
    } else {
      return (
        <AppConsumer>
          {({ setObjToSearch, listSelectFunc }) => (
            <TouchableOpacity onPress={() => listSelectFunc(this.props.objectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'lightgray'}}>
              <View style={styles.tableItem}>
                <Text>
                  {this.props.latitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text>
                  {this.props.longitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.tableItem}>
                <Text>
                  {this.props.distance.toFixed(1)}
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

  closeEnoughForAr = (tooFar, enterAR, objToSearch, calculatedObjPos) =>{
    if (tooFar === false){
      return(
        <Button title="GO" onPress={() => enterAR(objToSearch, calculatedObjPos)}/>
      )
    } else {
      return (
        <Text>
          Too Far!
        </Text>
      )
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
})

export default DroppedObjList
