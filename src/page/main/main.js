import React from 'react';


import Scene01 from '../scene01/scene01'
import Title from '../../components/title/Title'
import Info from '../../components/info/Info'

//import contexts
import ButtonComponentPrivider from '../../Context/buttonContext'

export default function Main() {
  return (
    <ButtonComponentPrivider>
      <div className="main">
        <Title />
        <Scene01 />
        <Info />
      </div>
    </ButtonComponentPrivider>
  );
}