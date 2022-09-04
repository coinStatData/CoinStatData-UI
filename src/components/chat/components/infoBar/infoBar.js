import React from 'react';

import onlineIcon from './icon/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';

import './styles.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
      <h3>Coin Chat!</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"></a>
    </div>
  </div>
);

export default InfoBar;