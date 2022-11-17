import React from 'react';
import './infoContent.css';

const GlobalIndexInfo = (props) => {
  return (
    <>
      <div className="info-bar-content-cont">
        <strong>CSD-60 Global Index</strong>
        <div>
          <p>
            The CSD Global Index consists of CSD-50 Index and CSD-10 Stable Index, accumulated by the total market capitlization and total volume. 
            The data is available in hourly and daily intervals. 
          </p>
        </div>
      </div>
    </>
  )
}

export default GlobalIndexInfo;