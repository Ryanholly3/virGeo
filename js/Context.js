import React, { Component } from 'react';

export const AppContext = React.createContext();
var baseUrl = 'https://13b22f8c.ngrok.io'


export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'ryan',
      userObjs: [],
      users: [],
      droppedObjs: [],
      loggedIn: false,
    }
  }

  async componentDidMount() {
    const userResponse = await fetch(`${baseUrl}/users`)
    const objResponse = await fetch(`${baseUrl}/dropped_objects`)

    const userjson = await userResponse.json();
    const objjson = await objResponse.json();

    this.setState({
      users: userjson.virgeo_users,
      droppedObjs: objjson.dropped_object,
    })
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          loggedIn: this.state.loggedIn,
          users: this.state.users
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
