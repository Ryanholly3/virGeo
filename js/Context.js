import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

var baseUrl = 'http://192.168.0.33:3101'

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
      organizedDroppedObjs: [],

      currentLat: 0,
      currentLong: 0,
      navError: false,

      objToDrop: [],
      objToSearch: {},
      objPosition: {}
    }
  }

  async componentDidMount() {

    const userResponse = await fetch(`${baseUrl}/users`)
    const objResponse = await fetch(`${baseUrl}/objects`)
    const droppedObjResponse = await fetch(`${baseUrl}/dropped_objects`)

    const userjson = await userResponse.json();
    const objjson = await objResponse.json();
    const droppedObjjson = await droppedObjResponse.json();
    const organizedDroppedObjs = await this.organizeDroppedObj(droppedObjjson.objects)

    this.setState({
      users: userjson.virgeo_users,
      objects: objjson.objects,
      droppedObjs: droppedObjjson.objects,
      organizedDroppedObjs: organizedDroppedObjs,
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
      currentLat: 0,
      currentLong: 0,
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

  setObjToSearch = (objId) =>{
    let objToSearch = {}

    for(let i=0; i < this.state.droppedObjs.length; i++){
      if(objId === this.state.droppedObjs[i].id){
        objToSearch = this.state.droppedObjs[i]
      }
    }
    console.log('obj to search', objToSearch)
    this.setState({
      objToSearch: objToSearch
    })
  }

  calculatedObjPos = (objPosition) =>{
    this.setState({
      objPosition: objPosition
    })
  }

  organizeDroppedObj = (objs) =>{
    console.log('triggered!!!!')
    var toBeOrganized;
    if (this.state.organizedDroppedObjs === []){
      toBeOrganized = this.state.droppedObjs
    } else {
      toBeOrganized = objs
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let userLat = position.coords.latitude
        let userLong = position.coords.longitude
        let calcDistance = 0
        for(let i=0; i< toBeOrganized.length;i++){
          calcDistance = latLongToDistanceAway(userLat, userLong, toBeOrganized[i].latitude, toBeOrganized[i].longitude)
          toBeOrganized[i].distance = calcDistance
        }
        let organized = selectionSort(toBeOrganized)
        console.log('organized', organized)
        this.setState({
          organizedDroppedObjs: organized
        })

      },
      (error) => this.setState({ navError: true }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
    )

    return 'done'

    function selectionSort(array){
      for(var i = 0; i < array.length; i++){
        var min = i;
        for(var j = i+1; j < array.length; j++){
          if(array[j].distance < array[min].distance){
           min = j;
          }
        }
        var temp = array[i];
        array[i] = array[min];
        array[min] = temp;
      }
      return array;
    };

    function latLongToDistanceAway(lat1, long1, lat2, long2){
      var radiusEarth = 6371e3;

      //convert degrees to radians
      var lat1r = (lat1 * Math.PI)/180
      var lat2r = (lat2 * Math.PI)/180

      //difference lat and difference long in radians
      var dlat = (lat2 - lat1) * Math.PI / 180
      var dlong = (long2 - long1) * Math.PI / 180

      var a = Math.sin(dlat/2) * Math.sin(dlat/2) + Math.cos(lat1r) * Math.cos(lat2r) * Math.sin(dlong/2) * Math.sin(dlong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return radiusEarth * c
    }
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
          organizedDroppedObjs: this.state.organizedDroppedObjs,

          objToDrop: this.state.objToDrop,
          objToSearch: this.state.objToSearch,
          objPosition: this.state.objPosition,

          logIn: this.logIn,
          logOut: this.logOut,
          pickUpObj: this.pickUpObj,
          dropObj: this.dropObj,
          calculatedObjPos: this.calculatedObjPos,
          setObjToSearch: this.setObjToSearch,
          organizeDroppedObj: this.organizeDroppedObj
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
