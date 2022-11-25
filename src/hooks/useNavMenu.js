import { useState } from 'react';
import { useNavigate  } from "react-router-dom";

const useNavMenu = () => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    switch(page) {
      case "Statistic":
        navigate('stat');
        break;
      case "Portfolio-Opt":
        navigate('optimization');
        break;
      case "Chat-Room":
        navigate('chat');
        break;
      case "Crypto-API":
        navigate('publicAPI');
        break;
      case "Store":
        window.open("https://alienvogue.com", '_blank')
        break;
      default:
        // code block
    }
  };
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return { anchorElNav, handleOpenNavMenu, handleCloseNavMenu }
}

export default useNavMenu;