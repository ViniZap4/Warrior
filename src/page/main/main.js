import React from 'react';


import Scene01 from '../scene01/scene01'
import Title from '../../components/title/Title'
import Info from '../../components/info/Info'

export default function Main() {
  return (
    <div className="main">
      <Title />
      <Scene01 />
      <Info />
    </div>

  );
}