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
      fireworks: false,
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

    //Firework
    const viroFireworkColors =["#ff2d2d","#42ff42","#00edff","#ffff00","#ffb5f8","#00ff1d","#00edff","#ffb14c", "#ff7cf4"];
    const colorRand1 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand2 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand3 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/low-poly_gold_coin/scene.gltf')}
            type="GLTF"
            position={[objPosition.posX, 0, objPosition.posZ]}
            visible={!this.state.fireworks}
            rotation={[0,0,0]}
            scale={[0.2, 0.2, 0.2]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
          <Viro3DObject source={require('./res/arrow/scene.gltf')}
            type="GLTF"
            position={[objPosition.posX, 3, objPosition.posZ]}
            visible={!this.state.fireworks}
            rotation={[90,0,0]}
            scale={[0.5, 0.5, 0.5]}
            animation={{
              name:'animateArrow',
              run: true,
              loop: true
            }}
          />
          <ViroParticleEmitter
            position={[objPosition.posX, 4, objPosition.posZ]}
            duration={1200}
            delay={1000}
            visible={true}
            run={this.state.fireworks}
            loop={true}
            fixedToEmitter={true}

            image={{
              source:require("./res/particle_firework.png"),
              height:0.1,
              width:0.1,
              bloomThreshold:0.0
            }}

            spawnBehavior={{
              particleLifetime:[1200,1200],
              emissionRatePerSecond:[0,0],
              emissionBurst:[
                {time:0, min:300, max:350, cycles:1}
              ],
              spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:true},
              maxParticles:1000
            }}

            particleAppearance={{
              opacity:{
                initialRange:[1.0, 1.0],
                factor: "Time",
                interpolation:[
                  {endValue:0.0, interval:[800,1200]}
                ]
              },

              color:{
                initialRange:[colorRand1, colorRand2],
                factor:"Time",
                interpolation:[
                  {endValue:colorRand3, interval:[300,1200]}
                ]
              }
            }}

            particlePhysics={{
              explosiveImpulse:{impulse:0.12 * 6, position:[0,0,0], decelerationPeriod:1.0},
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  pennyRender(){
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    //Firework
    const viroFireworkColors =["#ff2d2d","#42ff42","#00edff","#ffff00","#ffb5f8","#00ff1d","#00edff","#ffb14c", "#ff7cf4"];
    const colorRand1 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand2 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand3 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];


    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/penny_coin/scene.gltf')}
            type="GLTF"
            visible={!this.state.fireworks}
            position={[objPosition.posX, 0, objPosition.posZ]}
            rotation={[0,0,0]}
            scale={[0.001, 0.001, 0.001]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
          <Viro3DObject source={require('./res/arrow/scene.gltf')}
            type="GLTF"
            position={[objPosition.posX, 3, objPosition.posZ]}
            visible={!this.state.fireworks}
            rotation={[90,0,0]}
            scale={[0.5, 0.5, 0.5]}
            animation={{
              name:'animateArrow',
              run: true,
              loop: true
            }}
          />
          <ViroParticleEmitter
            position={[objPosition.posX, 4, objPosition.posZ]}
            duration={1200}
            delay={1000}
            visible={true}
            run={this.state.fireworks}
            loop={true}
            fixedToEmitter={true}

            image={{
              source:require("./res/particle_firework.png"),
              height:0.1,
              width:0.1,
              bloomThreshold:0.0
            }}

            spawnBehavior={{
              particleLifetime:[1200,1200],
              emissionRatePerSecond:[0,0],
              emissionBurst:[
                {time:0, min:300, max:350, cycles:1}
              ],
              spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:true},
              maxParticles:1000
            }}

            particleAppearance={{
              opacity:{
                initialRange:[1.0, 1.0],
                factor:"Time",
                interpolation:[
                  {endValue:0.0, interval:[800,1200]}
                ]
              },

              color:{
                initialRange:[colorRand1, colorRand2],
                factor:"Time",
                interpolation:[
                  {endValue:colorRand3, interval:[300,1200]}
                ]
              }
            }}

            particlePhysics={{
              explosiveImpulse:{impulse:0.12 * 6, position:[0,0,0], decelerationPeriod:1.0},
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  rubyRender(){
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    //Firework
    const viroFireworkColors =["#ff2d2d","#42ff42","#00edff","#ffff00","#ffb5f8","#00ff1d","#00edff","#ffb14c", "#ff7cf4"];
    const colorRand1 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand2 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand3 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/low_poly_ruby/scene.gltf')}
            resources={[require('./res/low_poly_ruby/scene.bin')]}
            type="GLTF"
            visible={!this.state.fireworks}
            position={[objPosition.posX, 0, objPosition.posZ]}
            rotation={[0,0,0]}
            scale={[0.4, 0.4, 0.4]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
          <Viro3DObject source={require('./res/arrow/scene.gltf')}
            type="GLTF"
            position={[objPosition.posX, 3, objPosition.posZ]}
            visible={!this.state.fireworks}
            rotation={[90,0,0]}
            scale={[0.5, 0.5, 0.5]}
            animation={{
              name:'animateArrow',
              run: true,
              loop: true
            }}
          />
          <ViroParticleEmitter
            position={[objPosition.posX, 4, objPosition.posZ]}
            duration={1200}
            delay={1000}
            visible={true}
            run={this.state.fireworks}
            loop={true}
            fixedToEmitter={true}

            image={{
              source:require("./res/particle_firework.png"),
              height:0.1,
              width:0.1,
              bloomThreshold:0.0
            }}

            spawnBehavior={{
              particleLifetime:[1200,1200],
              emissionRatePerSecond:[0,0],
              emissionBurst:[
                {time:0, min:300, max:350, cycles:1}
              ],
              spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:true},
              maxParticles:1000
            }}

            particleAppearance={{
              opacity:{
                initialRange:[1.0, 1.0],
                factor:"Time",
                interpolation:[
                  {endValue:0.0, interval:[800,1200]}
                ]
              },

              color:{
                initialRange:[colorRand1, colorRand2],
                factor:"Time",
                interpolation:[
                  {endValue:colorRand3, interval:[300,1200]}
                ]
              }
            }}

            particlePhysics={{
              explosiveImpulse:{impulse:0.12 * 6, position:[0,0,0], decelerationPeriod:1.0},
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  diamondRender(){
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    //Firework
    const viroFireworkColors =["#ff2d2d","#42ff42","#00edff","#ffff00","#ffb5f8","#00ff1d","#00edff","#ffb14c", "#ff7cf4"];
    const colorRand1 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand2 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand3 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/diamond/scene.gltf')}
            resources={[require('./res/diamond/scene.bin')]}
            type="GLTF"
            visible={!this.state.fireworks}
            position={[objPosition.posX, 0, objPosition.posZ]}
            rotation={[0,0,0]}
            scale={[0.2, 0.2, 0.2]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
          <Viro3DObject source={require('./res/arrow/scene.gltf')}
            type="GLTF"
            position={[objPosition.posX, 3, objPosition.posZ]}
            visible={!this.state.fireworks}
            rotation={[90,0,0]}
            scale={[0.5, 0.5, 0.5]}
            animation={{
              name:'animateArrow',
              run: true,
              loop: true
            }}
          />
          <ViroParticleEmitter
            position={[objPosition.posX, 4, objPosition.posZ]}
            duration={1200}
            delay={1000}
            visible={true}
            run={this.state.fireworks}
            loop={true}
            fixedToEmitter={true}

            image={{
              source:require("./res/particle_firework.png"),
              height:0.1,
              width:0.1,
              bloomThreshold:0.0
            }}

            spawnBehavior={{
              particleLifetime:[1200,1200],
              emissionRatePerSecond:[0,0],
              emissionBurst:[
                {time:0, min:300, max:350, cycles:1}
              ],
              spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:true},
              maxParticles:1000
            }}

            particleAppearance={{
              opacity:{
                initialRange:[1.0, 1.0],
                factor:"Time",
                interpolation:[
                  {endValue:0.0, interval:[800,1200]}
                ]
              },

              color:{
                initialRange:[colorRand1, colorRand2],
                factor:"Time",
                interpolation:[
                  {endValue:colorRand3, interval:[300,1200]}
                ]
              }
            }}

            particlePhysics={{
              explosiveImpulse:{impulse:0.12 * 6, position:[0,0,0], decelerationPeriod:1.0},
            }}
          />
        </ViroARScene>
        )}
      </AppConsumer>
    );
  }

  stickRender(){
    var exitArFunc = this.props.sceneNavigator.viroAppProps.exitAr

    //Firework
    const viroFireworkColors =["#ff2d2d","#42ff42","#00edff","#ffff00","#ffb5f8","#00ff1d","#00edff","#ffb14c", "#ff7cf4"];
    const colorRand1 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand2 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    const colorRand3 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];

    return (
      <AppConsumer>
        {({ user, objPosition, dropObj, pickUpObj, objToSearch }) => (
        <ViroARScene>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject source={require('./res/wood_stick_04/scene.gltf')}
            type="GLTF"
            visible={!this.state.fireworks}
            position={[objPosition.posX, 0, objPosition.posZ]}
            rotation={[0,0,0]}
            scale={[0.001, 0.001, 0.001]}
            onClick={()=> this.pickUp(objToSearch, pickUpObj, exitArFunc)}
            animation={{
              name:'animateImage',
              run: true,
              loop: true
            }}
          />
          <Viro3DObject source={require('./res/arrow/scene.gltf')}
            type="GLTF"
            position={[objPosition.posX, 3, objPosition.posZ]}
            visible={!this.state.fireworks}
            rotation={[90,0,0]}
            scale={[0.5, 0.5, 0.5]}
            animation={{
              name:'animateArrow',
              run: true,
              loop: true
            }}
          />
          <ViroParticleEmitter
            position={[objPosition.posX, 4, objPosition.posZ]}
            duration={1200}
            delay={1000}
            visible={true}
            run={this.state.fireworks}
            loop={true}
            fixedToEmitter={true}

            image={{
              source:require("./res/particle_firework.png"),
              height:0.1,
              width:0.1,
              bloomThreshold:0.0
            }}

            spawnBehavior={{
              particleLifetime:[1200,1200],
              emissionRatePerSecond:[0,0],
              emissionBurst:[
                {time:0, min:300, max:350, cycles:1}
              ],
              spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:true},
              maxParticles:1000
            }}

            particleAppearance={{
              opacity:{
                initialRange:[1.0, 1.0],
                factor:"Time",
                interpolation:[
                  {endValue:0.0, interval:[800,1200]}
                ]
              },

              color:{
                initialRange:[colorRand1, colorRand2],
                factor:"Time",
                interpolation:[
                  {endValue:colorRand3, interval:[300,1200]}
                ]
              }
            }}

            particlePhysics={{
              explosiveImpulse:{impulse:0.12 * 6, position:[0,0,0], decelerationPeriod:1.0},
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

    this.setState({
      fireworks: true
    })

    alert(`congratulations! You picked up ${objToSearch.object_info[0].object_name}`)
    return pickUpObj(objToSearchId, objToSearchObjectId)

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
    moveDown:{properties:{positionY:"-=1"},
                  duration: 1000},
    moveUp:{properties:{positionY:"+=1"},
                  duration: 1000},
    animateArrow:[["moveDown", "moveUp"],]
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
