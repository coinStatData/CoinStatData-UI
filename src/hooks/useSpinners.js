import { useState } from 'react';
import ErrorSpinner from '../components/spinner/error';
import LoadingSpinner from '../components/spinner/loading';

const useSpinners = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const Spinners = () => {
    return (
      <div className="loading-cont">
        {isLoading ? 
          <LoadingSpinner/> : <ErrorSpinner /> 
        }
      </div>
    );
  }

  return { isLoading, isError, setIsError, setIsLoading, Spinners };
}

export default useSpinners;