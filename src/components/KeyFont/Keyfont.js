import React, { useState } from 'react';

//import context
import { useButtonContext } from '../../Context/buttonContext'

export default function Keyfont(props) {
  const [styleKeyfontBottom, setStyleKeyfontBottom] = useState({height:'0.612vh'})
  const {setActionButton, setStopActionButton} = useButtonContext()
  function pressKey(){
    setStyleKeyfontBottom({
      height:'0.1vh',
    })
    setActionButton(props.children)
  }
  function pressKeyUp(){
    setStyleKeyfontBottom({
      height:'0.612vh',
    })
    setActionButton("")
    setStopActionButton(props.children)
  }

  


  return(
    <div className="keyfont" 
      onMouseDown={pressKey} 
      onMouseUp={pressKeyUp}
      onMouseLeave={pressKeyUp}
      onTouchStart={pressKey}
      onTouchEnd={pressKeyUp}
    >
      <div className="keyfontTop"><span>{props.children}</span></div>
      <div className="keyfontBottom"
        style={styleKeyfontBottom} 
      ></div>
    </div>
  );
}