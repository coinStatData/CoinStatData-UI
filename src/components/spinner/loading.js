import React from 'react';
import './spinner.css';

function LoadingSpinner({ msg }) {

  return (
    <div className="spinner-cont">
      <div className="lds-hourglass">
        { msg ? msg : ' ' }
      </div>
    </div>
  );
}

export default LoadingSpinner;
