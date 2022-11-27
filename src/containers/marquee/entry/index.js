import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useNavigate  } from "react-router-dom";
import { ICON_PATHS } from '../../../util/constants/iconPaths';
import './entry.css';

const Entry = ({ id, change, name, updateCoin }) => {

  const navigate = useNavigate();

  const clickCoin = (coin) => {
    updateCoin(coin);
    navigate("/stat");
  }

  return (
    <div className="marquee-entry-cont" onClick={() => clickCoin(id)}>
      <img className="marquee-icon" src={ICON_PATHS[id]} alt="coin-icon"></img>
      <div className="coin-text">{name}</div>
      {change > 0 ? (
        <div className="percent-text green-text">
          {change.toFixed(2) + "%"}
          <ArrowDropUpIcon sx={{mb: "2px"}} />
        </div>
        ) : (
          <div className="percent-text red-text">
            {change.toFixed(2) + "%"}
            <ArrowDropDownIcon sx={{mb: "2px"}} />
          </div>
        )
      }
    </div>
  );
}

export default Entry;
