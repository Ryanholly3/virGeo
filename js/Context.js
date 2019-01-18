import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

var baseUrl = 'http://192.168.1.60:3101'

export const AppContext = React.createContext();


export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: [],
      avatar: '',

      users: [],
      objects: [],
      droppedObjs: [],
      organizedDroppedObjs: [],
      profileListSelect: 1,
      listSelect: 1,

      userLat: 0,
      userLong: 0,
      navError: false,

      objToDrop: [],
      objToSearch: {},
      objPosition: {},
      trackDistance: 0,
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
      objToSearch: organizedDroppedObjs[0],
    })
  }



  logIn = (userId) =>{
    fetch(`${baseUrl}/users/${userId}`)
      .then(response => response.json())
      .then(json => {
        let avatar = json.user[0].avatar_info[0].avatar_name

        return this.setState({
          user: json.user,
          loggedIn: true,
          avatar: avatar,
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
      avatar: '',
      userLat: 0,
      userLong: 0,
      navError: false,
      objToDrop: [],
      objToSearch: [],
    })
    Actions.login()
  }

  fetchDroppedObjs(){
    return fetch(`${baseUrl}/dropped_objects`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          droppedObjs: json.objects
        })
        return 'done'
      })
  }

  fetchUser(userId){
    return fetch(`${baseUrl}/users/${userId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          user: json.user,
        })
        return 'done'
      })
  }

  calculatedObjPos = (objPosition) =>{
    console.log(objPosition)

    this.setState({
      objPosition: objPosition
    })
  }

  trackObjToSearch = (obj) =>{
    navigator.geolocation.stopObserving()
    navigator.geolocation.watchPosition(
      (position) => {
        console.log('tracking')
        let userLat = position.coords.latitude
        let userLong = position.coords.longitude

        let calcDistance = 0
        calcDistance = this.latLongToDistanceAway(userLat, userLong, obj.latitude, obj.longitude)

        this.setState({
          trackDistance: calcDistance
        })

      return 'tracked'

      },
      (error) => this.setState({ navError: true }),
      { enableHighAccuracy: true, distanceFilter: 1, timeout: 10000, maximumAge: 10000 },
    )
    return 'tracked'
  }

  organizeDroppedObj = (objs) =>{
    var toBeOrganized;
    if (this.state.organizedDroppedObjs === []){
      toBeOrganized = this.state.droppedObjs
    } else {
      toBeOrganized = objs
    }

    navigator.geolocation.watchPosition(
      (position) => {
        let userLat = position.coords.latitude
        let userLong = position.coords.longitude

        let calcDistance = 0
        for(let i=0; i< toBeOrganized.length;i++){
          calcDistance = this.latLongToDistanceAway(userLat, userLong, toBeOrganized[i].latitude, toBeOrganized[i].longitude)
          toBeOrganized[i].distance = calcDistance
        }
        var organized = this.selectionSort(toBeOrganized)
        console.log('organized', organized)
        this.setState({
          organizedDroppedObjs: organized,
          userLat: userLat,
          userLong: userLong,
        })

      return organized

      },
      (error) => this.setState({ navError: true }),
      { enableHighAccuracy: true, distanceFilter: 1, timeout: 10000, maximumAge: 10000 },
    )

    return 'done'

  }

  reorganizeDroppedObj = () =>{
    var toBeOrganized = this.state.droppedObjs

    navigator.geolocation.stopObserving();
    navigator.geolocation.watchPosition(
      (position) => {
        let userLat = position.coords.latitude
        let userLong = position.coords.longitude

        let calcDistance = 0
        for(let i=0; i< toBeOrganized.length;i++){
          calcDistance = this.latLongToDistanceAway(userLat, userLong, toBeOrganized[i].latitude, toBeOrganized[i].longitude)
          toBeOrganized[i].distance = calcDistance
        }
        var organized = this.selectionSort(toBeOrganized)
        console.log('reorganized', organized)
        this.setState({
          organizedDroppedObjs: organized,
          userLat: userLat,
          userLong: userLong,
        })

      return organized

      },
      (error) => this.setState({ navError: true }),
      { enableHighAccuracy: true, distanceFilter: 1, timeout: 10000, maximumAge: 10000 },
    )

    return 'done'

  }

  selectionSort(array){
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

  latLongToDistanceAway(lat1, long1, lat2, long2){
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

  listSelectFunc = (objId) =>{
    var objToSearch = {}

    for(let i=0; i < this.state.droppedObjs.length; i++){
      if(objId === this.state.droppedObjs[i].id){
        objToSearch = this.state.droppedObjs[i]
      }
    }

    this.setState({
      listSelect: objId,
      objToSearch: objToSearch
    })
  }

  profileListSelectFunc = (objId) =>{
    var objToDrop = {}
    var userObjects = this.state.user[0].objects

    console.log('user_object_id:', objId)

    for(let i=0; i < userObjects.length; i++){
      if(objId === userObjects[i].user_object_id){
        objToDrop = userObjects[i]
      }
    }

    console.log('user_object:', objToDrop)

    this.setState({
      profileListSelect: objId,
      objToDrop: objToDrop
    })
  }

  dropObj = (userObjectId, objectId) => {
    let obj = {
      latitude: this.state.userLat,
      longitude: this.state.userLong,
      object_id: objectId
    }

    return fetch(`${baseUrl}/dropped_objects`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(()=>{
      return this.fetchDroppedObjs()
    })
    .then(()=>{
      return this.reorganizeDroppedObj()
    })
    .then(()=>{
      return fetch(`${baseUrl}/user_objects/${userObjectId}`, {
        method: 'DELETE',
      })
    })
    .then(()=>{
      return this.fetchUser(this.state.user[0].virgeo_user_id)
    })
  }

  pickUpObj = (droppedObjectId, objectId) =>{
    let obj = {
      virgeo_user_id: this.state.user[0].virgeo_user_id,
      object_id: objectId,
    }

    return fetch(`${baseUrl}/user_objects`, {
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
      return fetch(`${baseUrl}/dropped_objects/${droppedObjectId}`, {
        method: 'DELETE',
      })
    })
    .then(()=>{
      return this.fetchDroppedObjs()
    })
    .then(()=>{
      return this.reorganizeDroppedObj()
    })
  }


  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          loggedIn: this.state.loggedIn,
          user: this.state.user,
          userLat: this.state.userLat,
          userLong: this.state.userLong,
          avatar: this.state.avatar,

          users: this.state.users,
          objects: this.state.objects,
          droppedObjs: this.state.droppedObjs,
          organizedDroppedObjs: this.state.organizedDroppedObjs,
          listSelect: this.state.listSelect,
          profileListSelect: this.state.profileListSelect,

          objToDrop: this.state.objToDrop,
          objToSearch: this.state.objToSearch,
          objPosition: this.state.objPosition,
          trackDistance: this.state.trackDistance,

          logIn: this.logIn,
          logOut: this.logOut,
          pickUpObj: this.pickUpObj,
          dropObj: this.dropObj,
          calculatedObjPos: this.calculatedObjPos,
          organizeDroppedObj: this.organizeDroppedObj,
          reorganizeDroppedObj: this.reorganizeDroppedObj,
          listSelectFunc: this.listSelectFunc,
          profileListSelectFunc: this.profileListSelectFunc,
          trackObjToSearch: this.trackObjToSearch,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
