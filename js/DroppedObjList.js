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
    if(this.props.listSelect === this.props.objectId){
      return (
        <AppConsumer>
          {({ setObjToSearch, listSelectFunc }) => (
            <TouchableOpacity onPress={() => listSelectFunc(this.props.objectId)} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'gray'}}>
              <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <Text>
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
                <Button title='GO' disabled={true} onPress={()=> setObjToSearch(this.props.objectId)}/>
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
              <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <Text>
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
                <Button title='GO' onPress={()=> setObjToSearch(this.props.objectId)}/>
              </View>
            </TouchableOpacity>
          )}
        </AppConsumer>
      );
    }
  }
}

export default DroppedObjList
