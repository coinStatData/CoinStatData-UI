import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { update_coin } from '../../redux/slices/search';
import { connect } from 'react-redux';
import ErrorSpinner from '../spinner/error';
import LoadingSpinner from '../spinner/loading';
import * as trendingActions from '../../redux/actions/trendingCoins';
import './trending.css';

function Trending({ trendingCoins, fetchTrending }) {

  let navigate = useNavigate();
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
    if(trendingCoins.data.length === 0) {
      fetchTrending();
    }
  }, []);

  const clickCoin = (coin) => {
    dispatch(update_coin(coin));
    navigate("/stat");
  }

  return (
    <div className="trending-table-cont">
      <h4>Top Trending Coins</h4>
      <div className="trending-table">
        <Table striped hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>ID</th>
              <th>MC Rank</th>
            </tr>
          </thead>
          <tbody>
          {trendingCoins.isError ?
            <tr>
              <td colSpan="3">
                <ErrorSpinner />
                <br/><br/>
              </td>
            </tr>
          :
            trendingCoins.isLoading ?
              <tr>
                <td colSpan="3">
                  <LoadingSpinner />
                </td>
              </tr>
            :
            trendingCoins.data.length > 0 &&
              trendingCoins.data.map((item) => TableRow(item.item))
          }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trendingCoins: state.trendingCoins
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTrending: () => dispatch(trendingActions.fetchTrendingCoins()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
