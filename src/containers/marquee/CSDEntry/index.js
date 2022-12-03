import React from 'react';
import './styles.css';

const CSDEntry = ({ }) => {

  return (
    <div className="marquee-entry-cont csd-entry-cont">
      <img className="marquee-icon" src={require('../../../assets/CSDLogo33.png')} alt="CSD Logo"></img>
      <div className="coin-text">Welcome to CoinStatData!</div>
      <img className="marquee-icon" src={require('../../../assets/CSDLogo33.png')} alt="CSD Logo"></img>
    </div>
  );
}

export default CSDEntry;