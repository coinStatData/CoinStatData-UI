import React from 'react';
import './styles.css';

function CoinGecko() {

  return (
    <div className="coinGecko-cont">
      Data provided By <a href="https://www.coingecko.com/">CoinGecko API</a> <img src={require('../../assets/coinGecko.png')}></img>
    </div>
  );
}

export default CoinGecko;
