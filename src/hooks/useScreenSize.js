import { useState } from 'react';

const useScreenSize = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

  const calculateSize = () => {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    setScreenWidth(width);
  }

  window.addEventListener("resize", ()=> {
    calculateSize();
  });

  return { screenWidth }
}

export default useScreenSize;