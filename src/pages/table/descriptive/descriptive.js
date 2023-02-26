import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table2 from '../../../components/table/table';
import SearchBar from '../../../components/searchBar/searchBar';
import LineChartBoy from '../../../components/graph/lineChart';
import DotChart from '../../../components/graph/dotChart';
import BarChartBoy from '../../../components/graph/barChart';
import Histogram from '../../../components/graph/histogram';
import CandleStickChart from '../../../components/graph/candleStick';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useSelector } from 'react-redux';
import * as chartActions from '../../../redux/actions/chartData';
import { calculateGraphWidth } from '../../../util';
import LoadingSpinner from '../../../components/spinner/loading';
import ErrorSpinner from '../../../components/spinner/error';
import '../style.css';

function TablePage({ fetchCandleData, screenWidth, candleData, lineData, fetchLineData }) {

  const [isDaily, setIsDaily] = useState(true);
  const [graphWidth, setGraphWidth] = useState(calculateGraphWidth(screenWidth)[0]);
  const [graphWidthBar, setGraphWidthBar] = useState(calculateGraphWidth(screenWidth)[1]);
  const [histoWidth, setHistoWidth] = useState(calculateGraphWidth(screenWidth)[2]);
  const [histoHeight, setHistoHeight] = useState(calculateGraphWidth(screenWidth)[3]);
  const coin = useSelector((state) => state.search.coin);
  const timezone = useSelector((state) => state.userSettings.timezone);

  const changeDailyHourly = () => {
    setIsDaily(!isDaily);
  }

  const calculateSize = (screenWidth) => {
    const newWidth = screenWidth;
    const [newGraphWidth, newGraphWidthBar, nHistoWidth, nHistoHeight] = calculateGraphWidth(newWidth);
    if(graphWidth !== newGraphWidth) setGraphWidth(newGraphWidth);
    if(graphWidthBar !== newGraphWidthBar) setGraphWidthBar(newGraphWidthBar);
    if(histoWidth !== nHistoWidth) setHistoWidth(nHistoWidth);
    if(histoHeight !== nHistoHeight) setHistoHeight(nHistoHeight);
  }

  useEffect(() => {
    calculateSize(screenWidth);
  }, [screenWidth]);

  return (
    <>
      <div>
        <div className="chart-cont">
          <Tabs defaultActiveKey="Price" id="chart-tabs" className="mb-3">
            <Tab eventKey="Price" title="Price Chart">
              {candleData.resp.isLoading || lineData.resp.isLoading ? (
                  <LoadingSpinner />
                ) : (
                (Array.isArray(candleData.resp.data) 
                  && candleData.resp.data.length > 2 
                  && !candleData.resp.isError) ? (
                    <CandleStickChart 
                      candleData={candleData} 
                      coin={coin} 
                      graphWidth={graphWidth} 
                      timezone={timezone} 
                    />
                  ) : (
                  lineData.resp.isError ? (
                    <ErrorSpinner />
                    ) : (
                      <LineChartBoy 
                        graphWidth={graphWidth} 
                        timezone={timezone} 
                        lineData={lineData} 
                        setIsDaily={changeDailyHourly} 
                        isDaily={isDaily} 
                      />
                    )
                  )
                )
              }
            </Tab>
            <Tab eventKey="Average Return" title="Avg Return Chart">
              {lineData.resp.isError ? (
                  <ErrorSpinner />
                ) : (
                  <BarChartBoy 
                    graphWidth={graphWidthBar} 
                    lineData={lineData} 
                    isDaily={isDaily} 
                  />
                )
              }
            </Tab>
            <Tab eventKey="Histogram" title="Histogram">
              {lineData.resp.isError ? (
                  <ErrorSpinner />
                ) : (
                  <Histogram 
                    data={lineData.price.chart.data}
                    width={histoWidth}
                    height={histoHeight}
                  />
                )
              }
            </Tab>
            <Tab eventKey="DotChart" title="Dot Chart">
              {lineData.resp.isError ? (
                  <ErrorSpinner />
                ) : (
                  <DotChart 
                  lineData={lineData}
                  timezone={timezone}
                  isDaily={isDaily}
                  />
                )
              }
            </Tab>
          </Tabs>
        </div>
        <div className="hr-cont">
          <hr></hr>
        </div>
        <div className="table-page">
          <div className="half-page-cont">
            <SearchBar 
              fetchCandleData={fetchCandleData} 
              fetchLineData={fetchLineData} 
              lineData={lineData} 
            />
          </div>
          <div className="half-page-cont">
            <Table2 screenWidth={screenWidth} lineData={lineData}/>
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    candleData: state.candleData,
    lineData: state.lineData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCandleData: (coin, days) => dispatch(chartActions.fetchCandleStickData(coin, days)),
    fetchLineData: (coin, days, interval, timezone) => 
      dispatch(chartActions.fetchLineDataAndCalculate_price(coin, days, interval, timezone))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);

