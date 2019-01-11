'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroCamera,
  ViroFlexView,
  ViroButton,
  ViroParticleEmitter,
  ViroGeometry,
  ViroSphere,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations
} from 'react-viro';

import { AppConsumer } from './Context';


export default class ARSceneScreen extends Component {

  constructor() {
    super();
    this.state={
      gold: false,
      penny: true,
      ruby: false,
      diamond: false,
      stick: false,

      userLatitude: null,
      userLongitude: null,
      object: {}
    }
  }

  componentDidMount(){
    this.setState({
      userLatitude: this.props.sceneNavigator.viroAppProps.latitude,
      userLongitude: this.props.sceneNavigator.viroAppProps.longitude,
      object: this.props.sceneNavigator.viroAppProps.object
    })
  }

  render() {
    if(this.state.object.object_name === 'gold'){
      return this.goldRender()
    } else if (this.state.object.object_name === 'penny'){
      return this.pennyRender()
    } else if (this.state.object.object_name === 'ruby'){
      return this.rubyRender()
    } else if (this.state.object.object_name === 'diamond'){
      return this.diamondRender()
    } else if (this.state.object.object_name === 'stick'){
      return this.stickRender()
    } else {
      return this.noItemRender()
    }
  }

  goldRender(){
    return (
      <AppConsumer>
        {({ user, currentLat, currentLong }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/low-poly_gold_coin/scene.gltf')}
            type="GLTF"
            position={[0, 0, -1]}
            rotation={[0,0,0]}
            scale={[0.05, 0.05, 0.05]}
            onClick={this._onClick}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  pennyRender(){
    console.log('state', this.state.userLatitude)

    return (
      <AppConsumer>
        {({ user, currentLat, currentLong }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/penny_coin/scene.gltf')}
            type="GLTF"
            position={[0, 0, ]}
            rotation={[0,0,0]}
            scale={[0.001, 0.001, 0.001]}
            onClick={this._onClick}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  rubyRender(){
    return (
      <AppConsumer>
        {({ user, currentLat, currentLong }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/low_poly_ruby/scene.gltf')}
            resources={[require('./res/low_poly_ruby/scene.bin')]}
            type="GLTF"
            position={[0, 0, -1]}
            rotation={[0,0,0]}
            scale={[0.4, 0.4, 0.4]}
            onClick={this._onClick}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  diamondRender(){
    return (
      <AppConsumer>
        {({ user, currentLat, currentLong }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/diamond/scene.gltf')}
            resources={[require('./res/diamond/scene.bin')]}
            type="GLTF"
            position={[0, 0, -1]}
            rotation={[0,0,0]}
            scale={[0.2, 0.2, 0.2]}
            onClick={this._onClick}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  stickRender(){
    return (
      <AppConsumer>
        {({ user, currentLat, currentLong }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/penny_coin/scene.gltf')}
            type="GLTF"
            position={[0, 0, -1]}
            rotation={[0,0,0]}
            scale={[0.001, 0.001, 0.001]}
            onClick={this._onClick}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  noItemRender(){
    return(
      <ViroARScene>
      </ViroARScene>
    )
  }

  _onClick = () => {
    // var answer = this.bearingPhoneToObj(39.7575767, -105.0069728, 39.757611, -105.006963)
    alert('you clicked me!')
    // this.setState({
    //   pos: Math.random()*(-5)
    // })
  }

  getInitialCoordinates = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._mapVirtual(position.coords.latitude, position.coords.longitude, this.state.objLat, this.state.objLong)
        // could pass position.coords.latitude,long,heading into this if dont want to wait for state to update
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
    );
  }


  _mapVirtual = async (phoneLat, phoneLong, objLat, objLong) => {

    let distBetweenPhoneObj = await this.latLongToDistanceAway(phoneLat, phoneLong, objLat, objLong)
    let headingPhoneToObj = await this.bearingPhoneToObj(phoneLat, phoneLong, objLat, objLong)

    let radiansPhoneToObj = (headingPhoneToObj * Math.PI) / 180

    let objZ = -1 * (Math.cos(radiansPhoneToObj) * distBetweenPhoneObj)
    let objX = Math.sin(radiansPhoneToObj) * distBetweenPhoneObj

    let display = ` ${phoneLat} ${phoneLong} distBetweenPhoneObj: ${distBetweenPhoneObj}, headingPhoneToObj:
    ${headingPhoneToObj}, objX: ${objX}, objZ: ${objZ}`
    // alert(display)

    this.setState({
      objX: objX,
      objZ: objZ,
      phoneLat: phoneLat,
      phoneLong: phoneLong,
      phoneObjAngleRad: radiansPhoneToObj,
    })
  }

}


ViroMaterials.createMaterials({
  blueColor: {
    diffuseColor: "#0000FF"
  },
});

ViroAnimations.registerAnimations({
    animateImage:{properties:{rotateY:"+=360"},
                  duration: 4000},
});


var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = ARSceneScreen;
