import React from 'react';

import Keyfont from '../KeyFont/Keyfont'

import { useButtonContext } from '../../Context/buttonContext'

export default function Info() {

  return (
    <div className="info">
      
  
      <Layoutjoystick 
        top={<>
          <InfoActionContainer world="Q">
            Deslizar para esquerda
          </InfoActionContainer>
          <InfoActionContainer world="W">
            Pular
          </InfoActionContainer>
          <InfoActionContainer world="E">
            Deslizar para direita
          </InfoActionContainer>
  
        
        </>}
        bottom={<>
          <InfoActionContainer world="A">
            Esquerda
          </InfoActionContainer>
          <InfoActionContainer world="S">
            Agachar
          </InfoActionContainer>
          <InfoActionContainer world="D">
            Direita
          </InfoActionContainer>
        </>}
      />
      <Layoutjoystick 
        top={<>
          <InfoActionContainer world="F" >
            Atacar
          </InfoActionContainer>
          {/* <InfoActionContainer world="D+Shift">
            deslizar para direita
          </InfoActionContainer> */}
        </>}
        bottom={<>
          
          {/* <InfoActionContainer world="A+Shift">
            deslizar para direita
          </InfoActionContainer> */}
        </>}
      />
      
      



    </div>
  );
}
function Layoutjoystick(props) {
  return(
    <div className="layoutjoystick">
      <div className="layoutjoystickLineTop">
        {props.top}
      </div>
      <div className="layoutjoystickLineBottom">
        {props.bottom}
      </div>
    </div>
  )
}

function InfoActionContainer(props){
  return(<>
    <div className="InfoActionContainer" title={props.children}>
    <Keyfont>{props.world}</Keyfont>
      
      {/* <div className="InfoActionContainerText">
        {props.children}
      </div> */}

    </div>
    
  </>)
}