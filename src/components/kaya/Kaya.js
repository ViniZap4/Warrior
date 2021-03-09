import React,{ useState } from 'react';
import kayaIdleImg from '../../img/kaya/idle/Warrior_Idle.gif'
import kayaRunImg from '../../img/kaya/run/Warrior_Run.gif'
import kayaJumpImg from '../../img/kaya/jump/jump.gif'
import KayaToFallImg from '../../img/kaya/fall/tofall.gif'

export default function Kaya() {
  const [flip, setflip] = useState(1)
  const [movingRight, setMovingRight] = useState (false)
  const [movingLeft, setMovingLeft] = useState (false)
  const [jumpingLeft, setJumpingLeft] = useState (false)
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
        setLocationRight(locationRight+5) 
        setMeshKaya(kayaRunImg)

      }, 1)
    }
    if (event.key === 'a' || event.key === 'ArrowLeft' ){
      setflip(-1)
      setMovingLeft(true)
      setTimeout(function() {
        setLocationRight(locationRight-5) 
        setMeshKaya(kayaRunImg)

      }, 1)
    }
    if (event.key === 'w' || event.key === 'ArrowUp' ||  event.key === ' ' ){
      if(!jumpingLeft){
        setJumpingLeft(true)
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
          setJumpingLeft(false)

          setTransition(0)

        }, 600)
      }
    }
  }
  function stopActionKaya(event) {
    if (event.key === 'd' ||event.key === 'ArrowRight' ){
      setMovingRight(false)
      setMeshKaya(kayaIdleImg)

    }
    if (event.key === 'a' || event.key === 'ArrowLeft' ){
      setMeshKaya(kayaIdleImg)
      setMovingLeft(false)
    }
    if (event.key === 'w' || event.key === 'ArrowUp' ){
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