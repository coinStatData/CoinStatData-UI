import React from 'react';
import './infoContent.css';

const GlobalIndexInfo = (props) => {
  return (
    <>
      <div className="info-bar-content-cont">
        <strong>CSD-60 Aggregate</strong>
        <div>
          <p>
            The CSD-60 Aggregate consists of CSD-50 Index and CSD-10 Stable Index, aggregated by the total market capitlizations and total volumes. 
            The data is available in hourly and daily intervals. 
          </p>
        </div>
      </div>
    </>
  )
}

export default GlobalIndexInfo;