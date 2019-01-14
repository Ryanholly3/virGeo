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
      objToSearch: {}
    }
  }


  render() {
    let objProps = this.props.sceneNavigator.viroAppProps.objToSearch.object_info[0].object_name

    if(objProps === 'gold'){
      return this.goldRender()
    } else if (objProps === 'penny'){
      return this.pennyRender()
    } else if (objProps === 'ruby'){
      return this.rubyRender()
    } else if (objProps === 'diamond'){
      return this.diamondRender()
    } else if (objProps === 'stick'){
      return this.stickRender()
    } else {
      return this.noItemRender()
    }
  }

  goldRender(){
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/low-poly_gold_coin/scene.gltf')}
            type="GLTF"
            position={[3 ,0, 0]}
            rotation={[0,0,0]}
            scale={[0.2, 0.2, 0.2]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
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
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/penny_coin/scene.gltf')}
            type="GLTF"
            position={[0, 0, ]}
            rotation={[0,0,0]}
            scale={[0.001, 0.001, 0.001]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
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
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/low_poly_ruby/scene.gltf')}
            resources={[require('./res/low_poly_ruby/scene.bin')]}
            type="GLTF"
            position={[0, 0, -1]}
            rotation={[0,0,0]}
            scale={[0.4, 0.4, 0.4]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
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
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/diamond/scene.gltf')}
            resources={[require('./res/diamond/scene.bin')]}
            type="GLTF"
            position={[0, 0, -1]}
            rotation={[0,0,0]}
            scale={[0.2, 0.2, 0.2]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
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
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/penny_coin/scene.gltf')}
            type="GLTF"
            position={[0, 0, -1]}
            rotation={[0,0,0]}
            scale={[0.001, 0.001, 0.001]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
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

  pickUp(objToSearch, pickUpObj, exitAr){
    let objToSearchId = objToSearch.id
    let objToSearchObjectId = objToSearch.object_info[0].object_id

    return pickUpObj(objToSearchId, objToSearchObjectId)
    .then(()=>{
      exitAr()
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
