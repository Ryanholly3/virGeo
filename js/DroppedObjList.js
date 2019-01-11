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
  TouchableHighlight,
  ImageBackground
} from 'react-native';

import { AppConsumer } from './Context';
import { Actions } from 'react-native-router-flux';
const gridBackground = require('./res/grid_background.png')


class DroppedObjList extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'gray'}}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={{color: 'black'}}>
            {this.props.latitude}
          </Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>
            {this.props.longitude}
          </Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>
            {this.props.distance}
          </Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Button title='GO' onPress={()=>alert('you clicked me')}/>
        </View>
      </View>
    );
  }
}

export default DroppedObjList
