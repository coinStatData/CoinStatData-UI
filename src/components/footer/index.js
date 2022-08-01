import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import './style.css';

function Footer() {
	const [showAlert, setShowAlert] = useState(true);
    
  return (
    <div className="footer-outer-cont">
      {showAlert &&
        <div className="disclaimer-cont">
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Important Disclaimer!</Alert.Heading>
            <p className="disclaimer-p">
              All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (“Site”) is for your general information only, procured from third party sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. No content on our Site is meant to be a solicitation or offer.
            </p>
          </Alert>
        </div>
      }
      <div className="footer-cont">
        <div className="trade-mark-cont">
          <div className="title-logo">
            <h2>CoinStatData</h2>
            <img src={require('../../assets/csdLogo2.png')}></img>
          </div>
          <p>
            CoinStatData provides a fundemental analysis of the crypto Market. In addition to tracking price,
            volume and market capitalisation.
          </p>
          <p className="name-sig">© 2022 CoinStatData. All Rights Reserved</p>
        </div>
        <div className="aux-links-cont">
          <div className="link-cont">
            <h5>Donations</h5>
            <Link to="/donate">Bitcoin</Link>
            <Link to="/donate">Ethereum</Link>
          </div>
          <div className="link-cont">
            <h5>Github</h5>
            <a target="_blank" href="https://github.com/coinStatData">Link</a>
          </div>
          {/* <div className="link-cont">
            <h5>API's</h5>
            <a target="_blank" href="">Coming Soon</a>
          </div> */}
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
