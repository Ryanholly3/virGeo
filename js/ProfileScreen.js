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
} from 'react-native';

import { AppConsumer } from './Context';
import { Actions } from 'react-native-router-flux';


export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppConsumer>
        {({ user }) => (
          <View style={styles.outer} >
            <View style={styles.inner} >
              <Text
                style={styles.titleText}
                onPress={() => Actions.dashboard()}
              >
                PROFILE: {user}
              </Text>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}

var styles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
});
