'use strict'

import React, { Component } from 'react';
import {
  View,
  Text
} from "react-native";

import AppNavigator from "./js/AppNavigator";

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      name: 'ryan'
    }
  }


  render() {
    return (
        <AppNavigator name={this.state}/>
    );
  }
}
