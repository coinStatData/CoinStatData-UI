import React from 'react';
import './spinner.css';

function ErrorSpinner({ msg }) {

  return (
    <div className="spinner-cont">
      <div className="lds-hourglass-red">
        {msg ? msg : "ERROR"}
      </div>
    </div>
  );
}

export default ErrorSpinner;
