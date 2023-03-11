import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { update_capm } from '../../redux/slices/capm';
import LoadingSpinner from '../../components/spinner/loading';
import ErrorSpinner from '../../components/spinner/error';
import * as CSDIndexActions from '../../redux/actions/CSDIndex';
import { linearRegression, mean } from 'simple-statistics';
import { formatDate, calculateGraphWidth } from '../../util';
import { CSD_LIST } from '../../util/constants/coins';
import Table from 'react-bootstrap/Table'
import { ScatterChart, XAxis, Scatter, YAxis, Tooltip, CartesianGrid, ZAxis, Legend } from 'recharts';
import './CAPM.css';

const CAPM = (props) => {

  const {
    CSD_GlobalIndex, fetchGlobalIndex, capm, screenWidth
  } = props;

  const [indexMean, setIndexMean] = useState(0);
  const [graphWidth, setGraphWidth] = useState(calculateGraphWidth(screenWidth)[0]);
  const [allCoins, setAllCoins] = useState([]);
  const timezone = useSelector((state) => state.userSettings.timezone);
  const dispatch = useDispatch();

  useEffect(() => {
    if(capm.length === 0) {
      const payload = { 
        interval: 'daily',
        start: 0, 
        end: Date.now()
      };
      fetchGlobalIndex(payload);
      fetchAllCoins();
    }
  }, []);

  useEffect(() => {
    if(allCoins.length > 0) {
      calculateCAPM(allCoins);
    }
  }, [allCoins]);

  useEffect(() => {
    const wd = calculateGraphWidth(screenWidth);
    setGraphWidth(wd[0]);
  }, [screenWidth]);

  const fetchAllCoins = async () => {
    const payload = { 
      interval: 'daily',
      start: 0, 
      end: Date.now()
    };
    const coinRespArr = [];
    for(let coin of CSD_LIST) {
      payload.coin = coin;
      const resp = await CSDIndexActions.fetchReturnCSD60Coin(payload);
      if(resp) coinRespArr.push(resp);
    }
    setAllCoins(coinRespArr);
    return coinRespArr;
  }

  const calculateCAPM = (coinRespArr) => {
    const returnGlobal = CSD_GlobalIndex.returnData.map(item => Number(item.change));
    const globalMean = mean(returnGlobal) * 365;
    setIndexMean(globalMean.toFixed(2));
    const capmResult = [];
    for(let coin of coinRespArr) {
      const returnCoin = coin.returnData.map(item => Number(item.change));
      const result = linearRegression([returnGlobal, returnCoin]);
      const ER = Number(result.m.toFixed(5) * globalMean+ + result.b.toFixed(5)).toFixed(3);
      capmResult.push({ x: Number(result.m.toFixed(5)), y: ER, alpha: Number(result.b.toFixed(5)), z: coin.metaData.coin });
    }
    dispatch(update_capm(capmResult));
  }

  function TableRow(item) {
    return (
      <tr key={item.z}>
        <td>{item.z}</td>
        <td>{item.x}</td>
        <td>{item.alpha}</td>
        <td>{item.y}</td>
      </tr>
    );
  }
  
  return (
    <div className="CAPMM-outer-cont">
      {capm.length === 0 ? (
        <div className="loading-cont">
          <LoadingSpinner />
        </div>

        ) : (
          <div className="CAPMM-inner-cont">
            <h4>Capital Asset Pricing Model (CAPM)</h4>
            <div className="CAPMM-graph-cont">
              <ScatterChart
                width={graphWidth}
                height={graphWidth/3}
              >
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis label="Beta" dataKey="x" type="number" name="beta" />
                <YAxis label="ER" dataKey="y" type="number" name="Expected Return" />
                <ZAxis dataKey="z" type="category" name="coin" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="CAPM" data={capm} fill="#8884d8" />
              </ScatterChart>
            </div>
            <div className="CAPMM-table-cont"> 
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Beta</th>
                    <th>Alpha</th>
                    <th>Expected Return</th>
                  </tr>
                </thead>
                <tbody>
                {capm.map(coin => {
                    return (
                      TableRow(coin)
                    )
                  })
                }
                </tbody>
              </Table>
            </div>
          </div>
        )
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    CSD_GlobalIndex: state.CSD_GlobalIndex,
    CSD_60Index: state.CSD_60Index,
    capm: state.capm.result
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGlobalIndex: ({ interval, start, end }) => dispatch(CSDIndexActions.fetchCSDGlobalIndex({ interval, start, end })),
    fetchCSD60Index: ({ coin, interval, start, end }) => dispatch(CSDIndexActions.fetchCSD60Index({ coin, interval, start, end })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CAPM);
