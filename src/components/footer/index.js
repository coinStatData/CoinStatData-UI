import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

function Footer() {

  return (
    <div className="footer-cont">
      <div className="trade-mark-cont">
        <h2>CoinStatData</h2>
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
          <Link to="/donate">USD Coin</Link>
        </div>
        <div className="link-cont">
          <h5>Github</h5>
          <a target="_blank" href="https://github.com/coinStatData">Link</a>
        </div>
        <div className="link-cont">
          <h5>API's</h5>
          <a target="_blank" href="">Coming Soon</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
