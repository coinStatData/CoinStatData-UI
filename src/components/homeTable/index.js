import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import Table from 'react-bootstrap/Table'
import { ICON_PATHS } from '../../util/constants/coins';
import { useNavigate  } from "react-router-dom";
import './styles.css';

function HomeTable(props) {
  const { resp_g, coin_g, update_g } = useContext(UserContext);
  const [tableD, setTableD] = useState();
  const [isLambda, setIsLambda] = useState();
  let navigate = useNavigate();

  const clickCoin = (coin) => {
    update_g(coin, "coin");
    navigate("/stat");
  }

  function TableRow(item, index) {
    return (
      <tr onClick={()=>clickCoin(item[0])} key={item[0]}>
        <td>
          {index+1}
        </td>
        <td className="coin-name">
          <img className="coin-icon" src={ICON_PATHS[item[0]]} alt="coin-icon"></img>
          {item[0]}
        </td>
        <td>{item[1].usd}</td>
        <td>{Math.ceil(item[1].usd_market_cap)}</td>
        {props.screenWidth > 700 &&
          <td>{Math.ceil(item[1].usd_24h_vol)}</td>
        }
      </tr>
    )
  }
  
  function makeTable(coinData) {
    if(Array.isArray(coinData)) {
      let arr = coinData.map((item, index)=> {
        return TableRow(item, index);
      })
      return arr;
    }
  }

  return (
    <div className="home-table-cont">
      <Table className="home-table" hover responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            {props.screenWidth > 700 &&
              <th>24h Volume</th>
            }
          </tr>
        </thead>
        <tbody>
          {
            makeTable(props.coinData)
          }
        </tbody>
      </Table>
    </div>
  );
}



export default HomeTable;
