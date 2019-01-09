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
  Button,
  Picker
} from 'react-native';

import { AppConsumer } from './Context';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      selectedUser: 'Ryan'
    }
  }

  render() {
    return (
      <AppConsumer>
        {({ user, loggedIn, users, login }) => (
          <View style={styles.outer} >
            <Button title="Log in"  />
            <Button title="Sign in" />
            <Button title="GO Logan" onPress={() => login(2)} />
            <Text>
              { users && users[0] && users[0].user_name }
            </Text>
            <Text>
              { user && user[0] && user[0].user_name }
            </Text>
            <Picker
              selectedValue={this.state.selectedUser}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedUser: itemValue})}>
              <Picker.Item label="Ryan" value={1} />
              <Picker.Item label="Logan" value={2} />
              <Picker.Item label="Stephan" value={3} />
            </Picker>

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
    color: "black",
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "white",
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
