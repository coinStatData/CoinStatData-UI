import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useSelector } from 'react-redux';
import { calculateGraphWidth } from '../../../util';
import LoadingSpinner from '../../../components/spinner/loading';
import ErrorSpinner from '../../../components/spinner/error';
import * as CSDIndexActions from '../../../redux/actions/CSDIndex';
import { linearRegression } from 'simple-statistics';
import './inferential.css';

function Inferential(props) {

  const {
    CSD_GlobalIndex, CSD_60Index, screenWidth, fetchCSD60Index, fetchGlobalIndex
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
                  <div>
                    <div>
                      <strong>alpha:</strong> {regressionResult.alpha}
                    </div>
                    <div>
                      <strong>beta:</strong> {regressionResult.beta}
                    </div>
                  </div>
                )
              }
            </Tab>
            <Tab disabled eventKey="Regression" title="Regression">
            </Tab>
            <Tab disabled eventKey="SVM" title="SVM">
            </Tab>
          </Tabs>
        </div>
        <div className="hr-cont">
          <hr></hr>
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

