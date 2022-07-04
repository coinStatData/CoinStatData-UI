import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import './styles.css';

function Trending(props) {
  let navigate = useNavigate();
  const { update_g } = useContext(UserContext);
  const [trendingData, setTrendingData] = useState();

  function TableRow(item) {
    return (
      <tr onClick={()=>clickCoin(item.id)} key={item.id}>
        <td>{item.score + 1}</td>
        <td className="coin-name">
          <img className="coin-icon" src={item.small}></img>
          {item.id}
        </td>
        <td>{item.market_cap_rank}</td>
      </tr>
    )
  }

  useEffect(()=> {
    async function fetchData2() {
      try {
        let resp = await axios.get(`https://api.coingecko.com/api/v3/search/trending`);
        setTrendingData(mutateResp(resp));
      } catch(e) {
        console.log(e);
      }
    }
    fetchData2();
  }, [])

  const mutateResp = (resp) => {
    let data = resp.data.coins;
    return data;
  } 

  const clickCoin = (coin) => {
    update_g(coin, "coin");
    navigate("/stat");
  }

  return (
      <div className="trending-table-cont">
        <div className="trending-table">
          <h4>Top Trending Coins</h4>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Rank</th>
                <th>ID</th>
                <th>MC Rank</th>
              </tr>
            </thead>
            <tbody>
            {(Array.isArray(trendingData) && trendingData.length > 0) &&
              trendingData.map((item) => {
                return TableRow(item.item);
              })
            }
            </tbody>
          </Table>
        </div>
      </div>
  );
}

export default Trending;
