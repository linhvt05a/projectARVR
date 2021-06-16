import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ViroARSceneNavigator,ViroNode,
  ViroARPlaneSelector,ViroAnimations,
  ViroSpotLight,ViroAmbientLight,ViroARImageMarker,ViroARTrackingTargets,
  Viro3DObject,Viro360Image,ViroMaterials,ViroARPlane, ViroConstants, ViroARScene, ViroText, ViroBox } from '@viro-community/react-viro'
import { IMAGES } from './images'


const ARscreen = (props) => {
  const [text, setText] = useState('Initializing.....')
  const [anchorId,setAnchorID] = useState('')
  const onInitialized = (state,reason) => {
    console.log(reason)
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('mainAR')
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  const onClick = ()=>{
    props.sceneNavigator.push({scene: OtherARscreen})
  }
const onAnchorFound = (Y) => {
  console.log('onanchor',Y)
  if(Y.anchorId == ""){
    console.log('jkjkkjkjkj')
  }else{
    console.log('kkkkkkkk')
  }
}
  
  return (
    <ViroARScene onTrackingUpdated={onInitialized} onClick={onClick} onAnchorUpdated={(h)=>setAnchorID(h)}>
      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroARImageMarker target={"poster"} onAnchorFound={(HH)=>onAnchorFound(HH)} onAnchorUpdated={(e)=>console.log('update market',e)} />

        <ViroText  onClick={()=>console.log('click text')} text={text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox onClick={onClick} position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>
        <Viro3DObject
            source={require('./images/ball/object_soccer_ball.vrx')}
            position={[0, 15, 0]}
            scale={[.3, .3, .3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            transformBehaviors={['billboardY']}
            resources={[require('./images/ball/object_soccer_ball_diffuse.png'),
                       require('./images/ball/object_soccer_ball_normal.png'),
                       require('./images/ball/object_soccer_ball_specular.png')]}
            />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
          
        <ViroARPlaneSelector minHeight={.5} minWidth={.5} onPlaneSelected={()=> console.log('click pane')}/>
        <Viro3DObject
            source={IMAGES.emoji}
            resources={[
              IMAGES.image1,
              IMAGES.image2,
              IMAGES.image2
                ]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
            type="VRX" />
        
        
        <ViroARPlane anchorId={anchorId.anchorId} >
          {anchorId.anchorId && <ViroBox position={[0, .25, 0]} scale={[.1, .1, .1]} />}
        </ViroARPlane>
        <Viro360Image source={IMAGES.image2} />

      </ViroARScene>
    
     
  )
}

const OtherARscreen = (props) => {
  const [text, setText] = useState('otherARR.....')

  const onInitialized = (state) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('otherARR')
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  
  return(
    <ViroARScene onTrackingUpdated={onInitialized} >
    <ViroText  onClick={()=> props.sceneNavigator.pop()} text={text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
    <ViroBox onClick={()=>props.sceneNavigator.pop()} position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>
    <ViroAmbientLight color={"#aaaaaa"} />
    <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
      position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
    <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
      <Viro3DObject
        source={IMAGES.emoji}
        resources={[
          IMAGES.image1,
          IMAGES.image2,
          IMAGES.image2
            ]}
        position={[-5, .5, -5]}
        scale={[.2, .2, .2]}
        type="VRX" />
    </ViroNode>
  </ViroARScene>
  )
}
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: IMAGES.image1,
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

ViroARTrackingTargets.createTargets({
  poster : {
    source : IMAGES.image2,
    orientation : "Up",
    physicalWidth : 0.6096 // real world width in meters
  }
});
export default function App() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ARscreen,
      }}
      style={{ flex: 1 }} />
  )
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  }
})