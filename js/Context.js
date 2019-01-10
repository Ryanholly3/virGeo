import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

var baseUrl = 'https://13b22f8c.ngrok.io'

export const AppContext = React.createContext();



export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
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

  login = (userId) =>{
    // var currentUser = []
    //
    // for(let i=0; i < this.state.users.length; i++){
    //   if(userId === this.state.users[i].id){
    //     currentUser.push(this.state.users[i])
    //   }
    // }
    // this.setState({
    //   user: currentUser
    // })
    this.setState({
      loggedIn: true
    })
    .then(()=>{
      return Actions.profile()
    })

  }



  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          loggedIn: this.state.loggedIn,
          users: this.state.users,
          login: this.login,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
