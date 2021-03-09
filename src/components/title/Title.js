import React from 'react';

import logo from '../../img/icon/logo512.png'

export default function Title() {
  return (
    <div className="titleContent">
      <div className="lineLogo">
        <img
          className="logo"
          alt="joystick"
          src={logo}
        ></img>
        <h1 className="title">
          Kaya Game Test
        </h1>
      </div>
    </div>
  );
}