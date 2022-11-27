import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import { useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { update_coin } from '../../../redux/slices/search';
import * as chartActions from '../../../redux/actions/chartData';
import ErrorSpinner from '../../../components/spinner/error';
import LoadingSpinner from '../../../components/spinner/loading';
import { convertNumberFormat } from '../../../util';
import Tooltip from '@mui/material/Tooltip';
import { MINI_CHARTS } from '../../../util/constants/miniCharts';
import  { ICON_PATHS } from '../../../util/constants/iconPaths';
import './CSD50.css';

const CSD50 = (props) => {

  let navigate = useNavigate();
  const { screenWidth, coinIndex, index } = props;
  const dispatch = useDispatch();
  const [isFullDigits, setIsFullDigits] = useState(false);
  const [mcTotal, setMcTotal] = useState(0);
  const [volTotal, setVolTotal] = useState(0);

  const clickCoin = async (coin) => {
    dispatch(update_coin(coin));
    // const respp = props.fetchCandleData(coin, 100);
    navigate("/stat");
  }

  useEffect(() => {
    const mcSum = coinIndex[index].reduce((prev, curr) => prev + curr[1].usd_market_cap, 0);
    const volSum = coinIndex[index].reduce((prev, curr) => prev + curr[1].usd_24h_vol, 0);
    setMcTotal(mcSum);
    setVolTotal(volSum);
  }, [coinIndex]);

  function TableRow(item, index) {
    return (
      <tr onClick={() => clickCoin(item[0])} key={item[0]}>
        <td className="home-chart-td">
          {index+1}
        </td>
        <td className="coin-name home-chart-td">
          <img className="coin-icon" src={ICON_PATHS[item[0]]} alt="coin-icon"></img>
          {item[0]}
        </td>
        <td className="home-chart-td">
          {item[1].usd}
        </td>
        {(screenWidth > 500) &&
          <td className="home-chart-td">
            {isFullDigits ? Math.ceil(item[1].usd_market_cap) : convertNumberFormat(item[1].usd_market_cap)}
          </td>
        }
        {((screenWidth > 700 && screenWidth < 1000) || (screenWidth > 1250)) &&
          <td className="home-chart-td">
            {isFullDigits ? Math.ceil(item[1].usd_24h_vol): convertNumberFormat(item[1].usd_24h_vol)}
          </td>
        }
          <td className="mini-chart-td">
            <img 
              src={MINI_CHARTS[item[0]]} 
              width="100px" 
              height="28px"
              alt="5-day-chart"
            >
            </img>
          </td>
      </tr>
    );
  }
  
  function makeTable(coinData) {
    if(Array.isArray(coinData)) {
      const arr = coinData.map((item, index)=> {
        return TableRow(item, index);
      });
      return arr;
    }
  }

  return (
    <div className="">
      <Table className="home-table" hover responsive>
        <thead>
          <tr>
            <Tooltip title="Ranked by Market Cap" arrow>
              <th>Rank</th>
            </Tooltip>
            <th>Coin</th>
            <th>Price($)</th>
            {(screenWidth > 500) &&
              <th>{screenWidth < 550 ? "MC($)" : "Mkt Cap($)"}</th>
            }
            {((screenWidth > 700 && screenWidth < 1000) || (screenWidth > 1250)) &&
              <th>24h Vol($)</th>
            }
            <Tooltip title="Market Cap Chart of past 5 days (updated every 4h)" arrow>
              <th>5 Days(MC)</th>
            </Tooltip>
          </tr>
        </thead>
        <tbody>
          {coinIndex.isError ? 
            <tr>
              <td colSpan="6">
                <ErrorSpinner />
                <br/><br/>
              </td>
            </tr>
            : 
            coinIndex.isLoading ? 
              <tr>
                <td colSpan="6">
                  <LoadingSpinner />
                </td>
              </tr>
              :
              makeTable(coinIndex[index])
          }
        </tbody>
      </Table>
      <div className="index-summary-cont">
        <div className="total-sum">
          <strong>Total Market Cap:</strong> {"$" + Math.floor(mcTotal) + ` (${convertNumberFormat(mcTotal)})`}
        </div>
        <div className="total-sum">
          <strong>Total Volume:</strong> {"$" + Math.floor(volTotal) + ` (${convertNumberFormat(volTotal)})`}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCandleData: (coin, days) => dispatch(chartActions.fetchCandleStickData(coin, days)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSD50);
