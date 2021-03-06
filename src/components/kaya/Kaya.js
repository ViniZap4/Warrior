import React,{ useEffect, useState } from 'react';


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

//import context
import {useButtonContext} from '../../Context/buttonContext'
export default function Kaya() {
  const [flip, setflip] = useState(1)
  
  const [movingRight, setMovingRight] = useState (false)
  const [movingLeft, setMovingLeft] = useState (false)
  const [jumping, setJumping] = useState (false)
  const [crouch, setCrouch] = useState(false)
  const [slide, setSlide] = useState(false)
  const [attack, setAttack] = useState(false)
  const [falling, setFalling] = useState(false)

  const [locationRight,setLocationRight ] = useState(0)
  const [locationUp,setLocationUp ] = useState()
  
  const [opacityInput,  setOpacityInput] = useState()
  const [meshKaya, setMeshKaya] = useState(kayaIdleImg)
  const [transition, setTransition] = useState("0")

  const {actionButton, setActionButton, stopActionButton ,setStopActionButton } = useButtonContext()

  const velocity  = 10/9;
  const slideValue = 100;
  const gravity = 10/10;

  var styleKaya = {
    backgroundImage:`url(${meshKaya})`,
    transform: `scaleX(${flip})`,
    marginLeft:`${locationRight}px`,
    marginBottom:`${locationUp}px`,
    transition:` margin ${transition}s`,
  }

  var styleInput ={
    opacity:opacityInput
  }



  function actionKaya(event){    
    if (event.key.toLowerCase() === 'd' ||event.key === 'ArrowRight' ) setActionButton("D")
    if (event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft' ) setActionButton("A")
    if (event.key.toLowerCase() === 'w' || event.key === 'ArrowUp' ||  event.key === ' ' ) jumpEvent()
    if (event.key.toLowerCase() === 's' || event.key === 'ArrowDown' ) crouchEvent()
    if (event.key === 'Shift'){
      if(!slide){
        if(movingLeft){
          slideEvent(-1,-slideValue)
        }
        if(movingRight){
          slideEvent(1,slideValue)
        }
      }
    }
    if (event.key.toLowerCase() === 'f'){
      attackEvent() 
    }
    if(event.key.toLowerCase() === 'q'){
      slideEvent(-1,-slideValue)
    }
    if(event.key.toLowerCase() === 'e'){
      slideEvent(1,slideValue)
    }
  }

  
  function stopActionKaya(event) {
    if (event.key.toLowerCase() === 'd' ||event.key === 'ArrowRight' ){
      setActionButton("")
      setStopActionButton("D")
    }
    if (event.key.toLowerCase()=== 'a' || event.key === 'ArrowLeft' ){
      setActionButton("")
      setStopActionButton("A")
    }
    if (event.key.toLowerCase() === 's' || event.key === 'ArrowDown' ){
      stopCrouch()
    }
  
  }

  function validAction(){
    var valid = false
    if(!attack){
      if(!jumping){
        if(!slide){
          if(!crouch){
            valid = true
          }
        }
      }
    }
    return valid
  }
  
  function moveEvent(flip,velocity,right){
    setflip(flip) 
    setMovingRight(right)
    setMovingLeft(!right)
    setTimeout(function() {
      setLocationRight(locationRight+velocity) 
      setMeshKaya(kayaRunImg)
      setStopActionButton("")
    }, 1)
  }
  function FallEvent(){
    setFalling(true)
    setTimeout(function() {
      if(locationUp > 0)  {
        setLocationUp(locationUp-gravity)
        setMeshKaya(KayaToFallImg)
      }
      if(locationUp <= 0){
        setFalling(false)
      }
    }, 1)
  }

  function jumpEvent(){
    if(!jumping){
      setJumping(true)
      setLocationUp(100) 
      setTransition(0.2)
      setMeshKaya(kayaJumpImg)
    
      setTimeout(function() {
        // setMeshKaya(kayaIdleImg)
        setJumping(false)
        setTransition(0)
        setMeshKaya(kayaIdleImg)

        setFalling(true)
      }, 600)
    }
   
  }

  function crouchEvent(){
    if(validAction()){
      if(!movingRight && !movingLeft){
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
        setStopActionButton("")
      }  
    } 
  }
  function  stopCrouch() {
    if(crouch){
      setCrouch(false)
      setMeshKaya(kayaCrouchStopImg)
      setTimeout(function() { 
        setMeshKaya(kayaIdleImg) 
      }, 150)
    }
    
  }
  function slideEvent(flip,location){
    if(validAction()){
      setflip(flip)
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
  function  attackEvent() {
    if(validAction()){
      setAttack(true)
      setMeshKaya(kayaAttackImg)
    
      setTimeout(function() { 
        setMeshKaya(kayaIdleImg)
        setAttack(false)
       
      }, 2000)
      
    } 
  }


  useEffect(() => {

    if (actionButton === "Q"){
      slideEvent(-1,-slideValue)
    }
    if (actionButton === "W"){
      jumpEvent()
    }
    if (actionButton === "E"){
      slideEvent(1,slideValue)
    }
    if (actionButton === "A"){
      moveEvent(-1,-velocity, false) 
    }

    if (actionButton === "S"){
      crouchEvent()
    }
    if (actionButton === "D"){
      moveEvent(1,velocity, true)
    }
    if (actionButton === "F"){
      attackEvent()
    }

    //stop
    if(stopActionButton === "A"){
      setMeshKaya(kayaIdleImg)
      setMovingLeft(false) 
    }
    if(stopActionButton === "D"){
      setMeshKaya(kayaIdleImg)
      setMovingRight(false) 
    }
    if(stopActionButton === "S"){
      stopCrouch()
    }
     FallEvent()
    
    document.getElementById("myAnchor").focus()
    // console.log(actionButton)
    // if(stopActionButton !== ""){
    //   console.log(stopActionButton + " stop")
    // }
    
  }, [actionButton, locationRight, locationUp, jumping]);

  return (<>
    <div className="kaya" style={styleKaya}>
    </div>
    <input type="text" id="myAnchor" className="inputActionKaya"
      onKeyDown={(event) => actionKaya(event)} 
      onKeyUp={(event) => stopActionKaya(event)} 
      style={styleInput}
      autocapitalize="off" 
      autocomplete="off"
      spellcheck="false"
      autocorrect="off"
      readonly="true"
      ng-model="answer"
      ng-virtual-keyboard
    ></input>
  </>);
}