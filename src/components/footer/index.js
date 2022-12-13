import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import { INFO_TEXT, COMPANY_RIGHTS, DISCLAIMER } from './constants';
import './footer.css';

function Footer() {
	const [showAlert, setShowAlert] = useState(true);
    
  return (
    <div className="footer-outer-cont">
      {showAlert &&
        <div className="disclaimer-cont">
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Important Disclaimer!</Alert.Heading>
            <p className="disclaimer-p">
              {DISCLAIMER}
            </p>
          </Alert>
        </div>
      }
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
            <Link to="/donate">Bitcoin</Link>
            <Link to="/donate">Ethereum</Link>
          </div>
          <div className="link-cont">
            <h5>Developer</h5>
            <a target="_blank" href="https://ai.coinstatdata.com">Artificial Intelligence</a>
            <Link to="/publicAPI">Crypto API</Link>
            <a target="_blank" href="https://github.com/coinStatData">GitHub</a>
          </div>
          <div className="link-cont">
            <h5>Socials</h5>
            <a target="_blank" href="https://www.instagram.com/coinstatdata/">Instagram</a>
            <a target="_blank" href="https://alienvogue.com">Merch</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Footer;
