import { useState } from 'react';
import { INPUT_ERROR_MSG, NETWORK_ERROR_MSG } from '../util/constants/errors';

const useErrorHandle = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const errorResponse = (e) => {
    if(e.response) {
      if(e.response.status == 404) {
        setErrorMessage(INPUT_ERROR_MSG);
        setShowAlert(true);
      } else {
        setErrorMessage(NETWORK_ERROR_MSG);
        setShowAlert(true);
      }
    } else {
      setErrorMessage(NETWORK_ERROR_MSG);
      setShowAlert(true);
    }
  }

  return { errorResponse, errorMessage, showAlert, setErrorMessage, setShowAlert }
}

export default useErrorHandle;