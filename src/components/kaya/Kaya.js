import React,{ useState } from 'react';


//import mesh Kaya
import kayaIdleImg from '../../img/kaya/idle/Warrior_Idle.gif'
import kayaRunImg from '../../img/kaya/run/Warrior_Run.gif'
import kayaJumpImg from '../../img/kaya/jump/jump.gif'
import KayaToFallImg from '../../img/kaya/fall/tofall.gif'
import kayaCrouchInitImg from '../../img/kaya/Crouch/Warrior_Crouch_init.gif'
import kayaCrouchImg from '../../img/kaya/Crouch/Warrior_Crouch_state.gif'
import kayaCrouchStopImg from '../../img/kaya/Crouch/Warrior_Crouch_stop.gif'


export default function Kaya() {
  const [flip, setflip] = useState(1)
  
  const [movingRight, setMovingRight] = useState (false)
  const [movingLeft, setMovingLeft] = useState (false)
  const [jumping, setJumping] = useState (false)
  const [crouch, setCrouch] = useState(false)

  const [locationRight,setLocationRight ] = useState(0)
  const [locationUp,setLocationUp ] = useState(0)
  
  const [meshKaya, setMeshKaya] = useState(kayaIdleImg)
  const [transition, setTransition] = useState("0")

  var styleKaya = {
    backgroundImage:`url(${meshKaya})`,
    transform: `scaleX(${flip})`,
    marginLeft:`${locationRight}px`,
    marginBottom:`${locationUp}px`,
    transition:`${transition}s`
  }


  function actionKaya(event){
    console.log(event.key)
    if (event.key === 'd' ||event.key === 'ArrowRight' ){
      setflip(1)
      setMovingRight(true)
      setTimeout(function() {
        setLocationRight(locationRight+10) 
        setMeshKaya(kayaRunImg)

      }, 1)
    }
    if (event.key === 'a' || event.key === 'ArrowLeft' ){
      setflip(-1)
      setMovingLeft(true)
      setTimeout(function() {
        setLocationRight(locationRight-10) 
        setMeshKaya(kayaRunImg)

      }, 1)
    }
    if (event.key === 'w' || event.key === 'ArrowUp' ||  event.key === ' ' ){
      if(!jumping){
        setJumping(true)
        setLocationUp(50) 
        setTransition(0.1)

        if(movingRight){
          setLocationRight(locationRight+50)
          setTransition(0.3)
        }
        if(movingLeft){
          setTransition(0.3)
          setLocationRight(locationRight-50) 
        }

        setMeshKaya(kayaJumpImg)
        setTimeout(function() {
          setMeshKaya(KayaToFallImg)
        }, 200)

        setTimeout(function() {
          setMeshKaya(KayaToFallImg)
          setLocationUp(0) 
          
          if(movingRight){
            setLocationRight(locationRight+100) 
            setTransition(0.3)
          }
          if(movingLeft){
            setTransition(0.3)
            setLocationRight(locationRight-100)
          }
          
        }, 300)

        setTimeout(function() {
          setMeshKaya(kayaIdleImg)
          setJumping(false)
          setTransition(0)

        }, 600)
      }
    }
    if (event.key === 's' || event.key === 'ArrowDown' ){
      if (!crouch && !jumping){
        setCrouch(true)
        setMeshKaya(kayaCrouchInitImg)
        
        setTimeout(function() {
          
          // if(movingRight){
          //   setLocationRight(locationRight+100) 
          //   setTransition(0.3)
          // }
          // else if(movingLeft){
          //   setTransition(0.3)
          //   setLocationRight(locationRight-100)
          // }else{
            setMeshKaya(kayaCrouchImg) 

          // }
          

        }, 150)

      }
    }
  }

  function stopActionKaya(event) {
    if (event.key === 'd' ||event.key === 'ArrowRight' ){
      setMeshKaya(kayaIdleImg)
      setMovingRight(false)

    }
    if (event.key === 'a' || event.key === 'ArrowLeft' ){
      setMeshKaya(kayaIdleImg)
      setMovingLeft(false)
    }
    if (event.key === 'w' || event.key === 'ArrowUp' ){
    }
    if (event.key === 's' || event.key === 'ArrowDown' ){
      setCrouch(false)
      setMeshKaya(kayaCrouchStopImg)
      setTimeout(function() { 
        setMeshKaya(kayaIdleImg) 
      }, 150)
    }
  }
  
  return (<>
    <div className="kaya" style={styleKaya}>
      
    </div>
    <input type="text" className="inputActionKaya"
      onKeyDown={(event) => actionKaya(event)} 
      onKeyUp={(event) => stopActionKaya(event)} 
    />
    {/* <p style={{position:"absolute", top:"0vh"}}>
    movingRight: {movingRight && "true"},  
    movingLeft : {movingLeft && "true"}, 
    jumpingLeft : {jumpingLeft}, 
    locationRight : {locationRight}, 
    locationUp : {locationUp}, 

    </p> */}
  </>);
}