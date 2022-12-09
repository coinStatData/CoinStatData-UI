import React, { useState } from 'react';
import csdIcon from './icon/csdLogo2.png';
import Join from '../join/join';
// import closeIcon from '../../icons/closeIcon.png';

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
          <h3>Coin Chat!</h3>
          {/* <img className="csd-icon" src={csdIcon} alt="CSD Logo" /> */}
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