import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import { INFO_TEXT, COMPANY_RIGHTS, DISCLAIMER } from './constants';
import './footer.css';

function Footer() {
	const [showAlert, setShowAlert] = useState(true);
    
  return (
    <div className="footer-outer-cont">
      <div className="footer-cont">
        <div className="trade-mark-cont">
          <div className="title-logo">
            <h2>CoinStatData</h2>
            <img src={require('../../assets/CSDLogo33.png')}></img>
          </div>
          <p>
            {INFO_TEXT}
          </p>
          <p id="name-sig">{COMPANY_RIGHTS}</p>
        </div>
        <div className="aux-links-cont">
          <div className="link-cont">
            <h5>Donations</h5>
            <a target="_blank" href="https://coinstatdata.com">CoinStatData</a>
          </div>
          <div className="link-cont">
            <h5>Developer</h5>
            <a target="_blank" href="https://github.com/coinStatData">GitHub</a>
            <a target="_blank" href="https://chat.coinstatdata.com">AI-Bot</a>
          </div>
          <div className="link-cont">
            <h5>Merchandise</h5>
            <a target="_blank" href="https://alienvogue.com">AlienVogue</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
