import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { update_coin } from '../../redux/slices/search';
import topTrendingService from '../../services/topTrending.service';
import './styles.css';

function Trending(props) {

  let navigate = useNavigate();
  const [trendingData, setTrendingData] = useState();
  const dispatch = useDispatch();

  function TableRow(item) {
    return (
      <tr onClick={() => clickCoin(item.id)} key={item.id}>
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
        const resp = await topTrendingService().fetchCoins();
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
    dispatch(update_coin(coin));
    navigate("/stat");
  }

  return (
      <div className="trending-table-cont">
        <div className="trending-table">
          <h4>Top Trending Coins</h4>
          <Table striped hover>
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
