import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useNavigate  } from "react-router-dom";
import './entry.css';

const Entry = ({ id, change, name, updateCoin }) => {

  let navigate = useNavigate();

  const clickCoin = (coin) => {
    updateCoin(coin);
    navigate("/stat");
  }

  return (
    <div className="marquee-entry-cont" onClick={() => clickCoin(id)}>
      <img className="marquee-icon" src={ICON_PATHS[id]} alt="coin-icon"></img>
      <div className="coin-text">{name}</div>
      {change > 0 ? (
        <div className="percent-text green-text">
          {change.toFixed(2) + "%"}
          <ArrowDropUpIcon />
        </div>
        ) : (
          <div className="percent-text red-text">
            {change.toFixed(2) + "%"}
            <ArrowDropDownIcon />
          </div>
        )
      }
    </div>
  );
}

export default Entry;

const ICON_PATHS = {
  'bitcoin': require('../../../assets/bitcoin.webp'),
  'ethereum': require('../../../assets/ethereum.webp'),
  'ripple': require('../../../assets/ripple.webp'),
  'solana': require('../../../assets/solana.webp'),
  'cardano': require('../../../assets/cardano.webp'),
  'dogecoin': require('../../../assets/dogecoin.webp'),
  'tron': require('../../../assets/tron.webp'),
  'eos': require('../../../assets/eos.webp'),
  'dash': require('../../../assets/dash.webp'),
  'zcash': require('../../../assets/zcash.webp'),
  'bitcoin-cash': require('../../../assets/bitcoin-cash.webp'),
  'polkadot': require('../../../assets/polkadot.webp'),
}
