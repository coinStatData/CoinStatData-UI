import React from 'react';
import './infoContent.css';

const CSDIndexInfo = (props) => {
  return (
    <>
      <div className="info-bar-content-cont">
        <strong>CSD-50 Index</strong>
        <div>
          <p>
            CoinStatData keeps track of top 50 prominent coins in the crypto market (none-stable coins). It keeps hourly and daily data.
            The constituents are subject to change, as deemed by the CoinStatData.
          </p>
        </div>
      </div>
      <div className="info-bar-content-cont">
        <strong>CSD-10 Stable Index</strong>
        <div>
          <p>
            CoinStatData keeps track of top 10 prominent stable coins in the crypto market. It keeps hourly and daily data. 
            The constituents are subject to change, as deemed by the CoinStatData. 
          </p>
        </div>
      </div>
    </>
  )
}

export default CSDIndexInfo;