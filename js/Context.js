import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

var baseUrl = 'https://13b22f8c.ngrok.io'

export const AppContext = React.createContext();


export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: [],

      users: [],
      objects: [],
      droppedObjs: [],

      currentLat: null,
      currentLong: null,
      navError: false,

      objToDrop: {},
      objToSearch: {},
    }
  }

  async componentDidMount() {
    const userResponse = await fetch(`${baseUrl}/users`)
    const objResponse = await fetch(`${baseUrl}/objects`)
    const droppedObjResponse = await fetch(`${baseUrl}/dropped_objects`)

    const userjson = await userResponse.json();
    const objjson = await objResponse.json();
    const droppedObjjson = await droppedObjResponse.json();

    this.setState({
      users: userjson.virgeo_users,
      objects: objjson.objects,
      droppedObjs: droppedObjjson.objects,
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

  fetchDroppedObjs(){
    fetch(`${baseUrl}/dropped_objects`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          droppedObjs: json.objects
        })
      })
  }

  fetchUser(userId){
    fetch(`${baseUrl}/users/${userId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          user: json.user
        })
      })
  }

  dropObj(objToDrop){
    let userObjId = objToDrop.user_object_id

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
        })

        let obj = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          object_id: objToDrop.user_object_id
        }
        return obj
      },
      (error) => this.setState({ navError: true }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
    ).then((obj)=>{
      return fetch(`${baseUrl}/dropped_objects`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    })
    .then(()=>{
      return this.fetchDroppedObjs()
    })
    .then(()=>{
      return fetch(`${baseUrl}/user_objects/${userObjId}`, {
        method: 'DELETE',
      })
    })
    .then(()=>{
      return this.fetchUser(this.state.user.virgeo_user_id)
    })
  }

  pickUpObj(objToPickUp){
    let userObjId = objToPickUp.id
    let obj = {
      virgeo_user_id: this.state.user[0].virgeo_user_id,
      object_id: this.state.user[0].objects.object_id,
    }

    fetch(`${baseUrl}/user_objects`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(()=>{
      return this.fetchUser(this.state.user[0].virgeo_user_id)
    })
    .then(()=>{
      return fetch(`${baseUrl}/dropped_objects/${userObjId}`, {
        method: 'DELETE',
      })
    })
    .then(()=>{
      return this.fetchDroppedObjs()
    })
  }


  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          loggedIn: this.state.loggedIn,
          user: this.state.user,

          users: this.state.users,
          objects: this.state.objects,
          droppedObjs: this.state.droppedObjs,

          currentLat: this.state.currentLat,
          currentLong: this.state.currentLong,

          objToDrop: this.state.objToDrop,
          objToSearch: this.state.objToSearch,

          login: this.login,
          login: this.login,
          pickUpObj: this.pickUpObj,
          dropObj: this.dropObj
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
