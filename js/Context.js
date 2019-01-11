import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

var baseUrl = 'http://10.6.90.187:3101'

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

      objToDrop: [],
      objToSearch: [],
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

  logIn = (userId) =>{
    fetch(`${baseUrl}/users/${userId}`)
      .then(response => response.json())
      .then(json => {
        return this.setState({
          user: json.user,
          loggedIn: true,
        })
      })
      .then(()=>{
        Actions.profile()
      })
  }

  logOut = () =>{
    this.setState({
      loggedIn: false,
      user: [],
      currentLat: null,
      currentLong: null,
      navError: false,
      objToDrop: [],
      objToSearch: [],
    })
    Actions.login()
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
          user: json.user,
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

          objToDrop: this.state.objToDrop,
          objToSearch: this.state.objToSearch,

          logIn: this.logIn,
          logOut: this.logOut,
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
