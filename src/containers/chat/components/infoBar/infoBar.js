import React, { useState } from 'react';
import Join from '../join/join';
import './styles.css';

const InfoBar = ({ room }) => {
  const [showJoin, setShowJoin] = useState(false);

  const toggleJoin = () => {
    setShowJoin(!showJoin);
  }

  return (
    <>
      <div className="info-bar">
        <div className="left-inner-cont">
          <h3>
            <a target="_blank" href="https://ai.coinstatdata.com">Coin Chat!</a>
          </h3>
        </div>
        <div className="right-inner-cont">
          <button onClick={toggleJoin}>Sign-In</button>
        </div>
      </div>
      <div className="join-cont">
        {showJoin && 
          <>
            <Join toggleJoin={toggleJoin} />
          </>
        }
      </div>
    </>
  )

};

export default InfoBar;