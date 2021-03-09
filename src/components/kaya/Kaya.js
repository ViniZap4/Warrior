import React,{ useState } from 'react';


//import mesh Kaya
import kayaIdleImg from '../../img/kaya/idle/Warrior_Idle.gif'
import kayaRunImg from '../../img/kaya/run/Warrior_Run.gif'
import kayaJumpImg from '../../img/kaya/jump/jump.gif'
import KayaToFallImg from '../../img/kaya/fall/tofall.gif'
import kayaCrouchInitImg from '../../img/kaya/Crouch/Warrior_Crouch_init.gif'
import kayaCrouchImg from '../../img/kaya/Crouch/Warrior_Crouch_state.gif'
import kayaCrouchStopImg from '../../img/kaya/Crouch/Warrior_Crouch_stop.gif'
import KayaSlideImg from '../../img/kaya/slide/Warrior-Slide.gif'
import kayaAttackImg from '../../img/kaya/attack/Warrior_Attack.gif'

export default function Kaya() {
  const [flip, setflip] = useState(1)
  
  const [movingRight, setMovingRight] = useState (false)
  const [movingLeft, setMovingLeft] = useState (false)
  const [jumping, setJumping] = useState (false)
  const [crouch, setCrouch] = useState(false)
  const [slide, setSlide] = useState(false)
  const [attack, setAttack] = useState(false)

  const slideValue = 100;
  const [locationRight,setLocationRight ] = useState(0)
  const [locationUp,setLocationUp ] = useState(0)
  
  const [meshKaya, setMeshKaya] = useState(kayaIdleImg)
  const [transition, setTransition] = useState("0")

  var styleKaya = {
    backgroundImage:`url(${meshKaya})`,
    transform: `scaleX(${flip})`,
    marginLeft:`${locationRight}px`,
    marginBottom:`${locationUp}px`,
    transition:` margin ${transition}s`,
  }


  function actionKaya(event){
    console.log(event.key)

    
    if (event.key === 'd' ||event.key === 'ArrowRight' ){
      setflip(1)
      setMovingRight(true)
      setMovingLeft(false)
      setTimeout(function() {
        setLocationRight(locationRight+10) 
        setMeshKaya(kayaRunImg)

      }, 1)
    }
    if (event.key === 'a' || event.key === 'ArrowLeft' ){
      setflip(-1)
      setMovingLeft(true)
      setMovingRight(false)
      setTimeout(function() {
        setLocationRight(locationRight-10) 
        setMeshKaya(kayaRunImg)

      }, 1)
    }
    if (event.key === 'w' || event.key === 'ArrowUp' ||  event.key === ' ' ){
      if(!jumping){
        setJumping(true)
        setLocationUp(63) 
        setTransition(0.2)

        if(movingRight){
          setTransition(0.3)
          setLocationRight(locationRight+50)
          
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
            setTransition(0.2)
          }
          if(movingLeft){
            setTransition(0.2)
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
          
          if(movingRight && !slide){
            slideEvent(slideValue)
          }
          else if(movingLeft && !slide){
            slideEvent(-slideValue)
          }else{
            setMeshKaya(kayaCrouchImg) 
            setCrouch(true)
          }
          

        }, 150)

      }
    }
    if (event.key === 'Shift'){
      if(!slide){
        if(movingLeft){
          slideEvent(-slideValue)
        }
        if(movingRight){
          slideEvent(slideValue)
        }
      }
    }
    if (event.key === 'q'){
      if(!attack){
        
        setAttack(true)
        setMeshKaya(kayaAttackImg)
     
        setTimeout(function() { 
          setMeshKaya(kayaIdleImg)
          setAttack(false)
        }, 2000)
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
    if (event.key === 's' || event.key === 'ArrowDown' ){
      if(crouch){
        setCrouch(false)
        setMeshKaya(kayaCrouchStopImg)
        setTimeout(function() { 
          setMeshKaya(kayaIdleImg) 
        }, 150)
      }
    }
  
  }
  
  function slideEvent(location){
    if(!jumping){
      setLocationRight(locationRight+location)
      setTransition(0.2)
      setSlide(true)
  
      setMeshKaya(KayaSlideImg)
      setTimeout(function() { 
        setMeshKaya(kayaIdleImg) 
        setSlide(false)
  
      }, 500)
    }
 
    
  }


  return (<>
    <div className="kaya" style={styleKaya}>
      
    </div>
    <input type="text" className="inputActionKaya"
      onKeyDown={(event) => actionKaya(event)} 
      onKeyUp={(event) => stopActionKaya(event)} 
    ></input>
  </>);
}