import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useSelector } from 'react-redux';
import { formatDate } from '../../../util';
import LoadingSpinner from '../../../components/spinner/loading';
import ErrorSpinner from '../../../components/spinner/error';
import * as CSDIndexActions from '../../../redux/actions/CSDIndex';
import { linearRegression } from 'simple-statistics';
import './inferential.css';

function Inferential(props) {

  const {
    CSD_GlobalIndex, CSD_60Index, fetchCSD60Index, fetchGlobalIndex
  } = props;

  const [regressionResult, setRegressionResult] = useState({});
  const coin = useSelector((state) => state.search.coin);
  const timezone = useSelector((state) => state.userSettings.timezone);

  useEffect(() => {
    const payload = { 
      interval: 'daily',
      start: 0, 
      end: Date.now()
    };
    fetchGlobalIndex(payload);
    payload.coin = coin;
    fetchCSD60Index(payload);
  }, [coin]);

  useEffect(() => {
    if(CSD_60Index.returnData.length > 0 && CSD_GlobalIndex.returnData.length > 0) {
      const returnCoin = CSD_60Index.returnData.map(item => Number(item.change));
      const returndGlobal = CSD_GlobalIndex.returnData.map(item => Number(item.change));
      const result = linearRegression([returnCoin, returndGlobal]);
      setRegressionResult({ beta: result.m.toFixed(5), alpha: result.b.toFixed(5) });
    }
  }, [CSD_60Index, CSD_GlobalIndex]);

  return (
    <>
      <div>
        <div className="chart-cont">
          <Tabs defaultActiveKey="CAPM" id="chart-tabs" className="mb-3">
            <Tab eventKey="CAPM" title="CAPM">
              {(CSD_GlobalIndex?.isLoading || CSD_60Index?.isLoading) ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <div className="CAPM-outer-cont">
                      <div className="CAPM-inner-cont">
                        <div>
                          <strong>{coin}'s beta:</strong> {regressionResult.beta}
                        </div>
                        <p>
                          Beta is a way of measuring an coin's volatility compared with the overall index's (CSD-50 Index) volatility.
                        </p>
                      </div>
                      <div className="CAPM-inner-cont">
                        <div>
                          <strong>{coin}'s alpha:</strong> {regressionResult.alpha}
                        </div>
                        <p>
                          Alpha measures the amount that a coin has returned in comparison to the market index (CSD-50 index) that it is compared against.
                        </p>
                      </div> 
                    </div>
                    <div className="CAPM-date">
                      <li>
                        <i>
                          <b>Date Range:</b> 
                          {"  " + formatDate(CSD_60Index.metaData?.start, 'default', timezone) + "  ~  "} 
                          {formatDate(CSD_60Index.metaData?.end, 'default', timezone)}
                        </i>
                      </li>
                    </div>
                    <div className="CAPM-info-cont">
                      <div className="CAPM-info-beta">
                        <strong>CAPM Equation</strong><br/>
                        r = Rf + beta (Rm – Rf) + Alpha
                        <li>r = return</li>
                        <li>Rf = risk-free rate of return</li>
                        <li>beta = systematic risk</li>
                        <li>Rm = market/index return, per a benchmark</li>
                      </div>
                      <div className="CAPM-info-beta">
                        <strong>Beta Rule of Thumb</strong>
                        <li>{"If the Beta of an individual stock is around 1.0, this means its price is perfectly correlated with the market."}</li>
                        <li>{"If Beta is greater than 1.0, which is referred to as 'defensive', this indicates the security is theoretically less volatile than the market."}</li>
                        <li>{"If Beta is less than 1.0, or 'aggressive', this indicates the assets price is more volatile than the market."}</li>
                      </div>
                    </div>
                  </>
                )
              }
            </Tab>
            <Tab disabled eventKey="Regression" title="Regression">
            </Tab>
            <Tab disabled eventKey="SVM" title="SVM">
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    CSD_GlobalIndex: state.CSD_GlobalIndex,
    CSD_60Index: state.CSD_60Index
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGlobalIndex: ({ interval, start, end }) => dispatch(CSDIndexActions.fetchCSDGlobalIndex({ interval, start, end })),
    fetchCSD60Index: ({ coin, interval, start, end }) => dispatch(CSDIndexActions.fetchCSD60Index({ coin, interval, start, end })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inferential);

