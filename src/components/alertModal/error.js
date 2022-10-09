import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './alert.css';

function ErrorModal({ errorMessage, setShowAlert, showAlert }) {

  return (
    <div>
      {showAlert && 
        <div className="alert-box">
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Sorry!</Alert.Heading>
            <p>
              {errorMessage}
            </p>
          </Alert>
        </div>
      }
    </div>
  );
}

export default ErrorModal;





