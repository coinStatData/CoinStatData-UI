import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table2 from '../../components/table/table';
import SearchBar from '../../components/searchBar/searchBar';
import LineChartBoy from '../../components/graph/lineChart';
import BarChartBoy from '../../components/graph/barChart';
import CandleStickChart from '../../components/graph/candleStick';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Footer from '../../components/footer';
import { useSelector, useDispatch } from 'react-redux';
import * as chartActions from '../../redux/actions/chartData';
import { calculateGraphWidth } from '../../util';
import LoadingSpinner from '../../components/spinner/loading';
import ErrorSpinner from '../../components/spinner/error';
import './style.css';

function TablePage({ fetchCandleData, screenWidth, candleData, lineData, fetchLineData }) {

  const [isDaily, setIsDaily] = useState(true);
  const [graphWidth, setGraphWidth] = useState(calculateGraphWidth(screenWidth)[0]);
  const [graphWidthBar, setGraphWidthBar] = useState(calculateGraphWidth(screenWidth)[1]);
  const coin = useSelector((state) => state.search.coin);

  const changeDailyHourly = () => {
    setIsDaily(!isDaily);
  }

  const calculateSize = () => {
    const newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const [newGraphWidth, newGraphWidthBar] = calculateGraphWidth(newWidth);
    if(graphWidth !== newGraphWidth) setGraphWidth(newGraphWidth);
    if(graphWidthBar !== newGraphWidthBar) setGraphWidthBar(newGraphWidthBar);
  }

  useEffect(() => {
    calculateSize();
  }, [screenWidth]);

  return (
    <>
      <div>
        <div className="chart-cont">
          <Tabs defaultActiveKey="Price" id="chart-tabs" className="mb-3">
            <Tab eventKey="Price" title="Price Chart">
              {candleData.resp.isLoading || lineData.resp.isLoading ? 
                <LoadingSpinner />
                :
                <>
                  {(Array.isArray(candleData.resp.data) && candleData.resp.data.length > 2 && !candleData.resp.isError) ? 
                      <CandleStickChart candleData={candleData} coin={coin} graphWidth={graphWidth} />
                    :
                      <>
                        {lineData.resp.isError ? 
                          <ErrorSpinner />
                          :
                          <LineChartBoy graphWidth={graphWidth} lineData={lineData} setIsDaily={changeDailyHourly} isDaily={isDaily} />
                        }
                      </>
                  }
                </>
              }
            </Tab>
            <Tab eventKey="Average Return" title="Avg Return Chart">
              {lineData.resp.isError ? 
                <ErrorSpinner />
                :
                <BarChartBoy graphWidth={graphWidthBar} lineData={lineData} isDaily={isDaily} />
              }
            </Tab>
          </Tabs>
        </div>
        <div className="hr-cont">
          <hr></hr>
        </div>
        <div className="table-page">
          <div className="half-page-cont">
            <SearchBar fetchCandleData={fetchCandleData} fetchLineData={fetchLineData} />
          </div>
          <div className="half-page-cont">
            <Table2 screenWidth={screenWidth} lineData={lineData}/>
          </div>
        </div>
      </div>
      <Footer></Footer>
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
    fetchLineData: (coin, days, interval) => dispatch(chartActions.fetchLineDataAndCalculate_price(coin, days, interval))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);

