import React, { Component } from 'react';

const AppContext = React.createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'ryan',
      loggedIn: false
    };
  }


  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          loggedIn: this.state.loggedIn
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
