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


export default class ProfileScreen extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      user: 'ryan'
    };

  }

  render() {
    return (
      <View style={styles.outer} >
        <View style={styles.inner} >

          <Text style={styles.titleText}>
            PROFILE
          </Text>

        </View>
      </View>
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
