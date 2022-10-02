import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table2 from '../../components/table/table';
import SearchBar from '../../components/searchBar/searchBar';
import LineChartBoy from '../../components/graph/lineChart';
import BarChartBoy from '../../components/graph/barChart';
import CandleStickChart from '../../components/graph/candleStick';
import { formatDate, checkIfSameArray } from '../../util'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import NavBarComp from '../../components/navBar/navBar';
import Footer from '../../components/footer';
import { useSelector, useDispatch } from 'react-redux';
import { update_lineData_success } from '../../redux/slices/chartData';
import * as chartActions from '../../redux/actions/chartData';
import { calculateGraphWidth } from '../../util';
import './style.css';

function TablePage({candleObj, lineObj, fetchCandleData, screenWidth}) {

  const [avgReturn, setAvgReturn] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [hMinReturn, setHminReturn] = useState(0);
  const [hMaxReturn, setHMaxReturn] = useState(0);
  const [isDaily, setIsDaily] = useState(true);
  const [avgSumData, setAvgSumData] = useState([]);
  const [avgSumMData, setAvgSumMData] = useState([]);
  const [avgMReturn, setAvgMReturn] = useState({});
  const [graphWidth, setGraphWidth] = useState(calculateGraphWidth(screenWidth)[0]);
  const [graphWidthBar, setGraphWidthBar] = useState(calculateGraphWidth(screenWidth)[1]);

  const interval = useSelector((state) => state.search.interval);
  const coin = useSelector((state) => state.search.coin);
  const dispatch = useDispatch();

  const coinGeckoResp = useSelector((state) => state.coinGeckoResp.value);
  const [coinGeckoRespCopy, setCoinGeckoRespCopy] = useState(coinGeckoResp); //copy due to double render

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

  const calAvg = (chartD) => {
    if(Array.isArray(chartD) && chartD.length>0) {
      const dObj = {};
      const mObj = {};
      const mdic = {};
      const dic = {};
      const weekDic = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
      };
      for(let i=0; i<chartD.length-2; i++) {
        let time = "";
        let mday = "";
        if(interval === "daily") {
          time = weekDic[(new Date(chartD[i]["name"]).getDay())];
          mday = new Date(chartD[i]["name"]).getDate();
          //month dates
          mObj[mday] = 0;
          mObj[mday+"_count"] = 0;
          mObj[mday+"_avg"] = 0;
          mdic[mday] = mday;
        } else {
          time = chartD[i]["name"].slice(-8);
        }
        //hourly and weekdays
        dObj[time] = 0;
        dObj[time+"_count"] = 0;
        dObj[time+"_avg"] = 0;
        dic[time] = time;
      }
      for(let i=0; i<chartD.length-2; i++) {
        let time = "";
        let mday = "";
        if(interval === "daily") {
          time = weekDic[(new Date(chartD[i]["name"]).getDay())];
          mday = new Date(chartD[i]["name"]).getDate();
          //month dates
          mObj[mday] += parseFloat(chartD[i].hourlyReturn);
          mObj[mday+"_count"] += 1;
          mObj[mday+"_avg"] = mObj[mday] / mObj[mday+"_count"];
        } else {
          time = chartD[i]["name"].slice(-8);
        }
        dObj[time] += parseFloat(chartD[i].hourlyReturn);
        dObj[time+"_count"] += 1;
        dObj[time+"_avg"] = dObj[time] / dObj[time+"_count"];
      }
      setAvgReturn(dObj);
      setAvgMReturn(mObj);
      const avgSumData = [];
      //hourly and days of week
      for(let d in dic) {
        const temp = {
          name: dic[d],
          avg: dObj[d+"_avg"],
          count: dObj[d+"_count"],
          sum: dObj[d],
        }
        avgSumData.push(temp);
      }
      setAvgSumData(avgSumData);

      if(interval === "daily") {
        //month days
        let marr = [];
        for(const d in mdic) {
          const temp = {
            name: mdic[d],
            avg: mObj[d+"_avg"].toFixed(5),
            count: mObj[d+"_count"],
            sum: mObj[d].toFixed(5),
          }
          marr.push(temp);
        }
        setAvgSumMData(marr);
      }
    }
  }

  useEffect(() => {
     //this is for coin gecko api
    if(Array.isArray(coinGeckoResp) && coinGeckoResp.length>1 && !checkIfSameArray(coinGeckoResp, coinGeckoRespCopy)) {
      setCoinGeckoRespCopy(coinGeckoResp);
      let max = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let hmax = -100;
      let hmin = 100;
      let chartD = coinGeckoResp.map((item, index) => {
        if(index < coinGeckoResp.length-2) {
          let ch = (coinGeckoResp[index+1][1] - item[1])/item[1] * 100;
          let row = {
            name: interval == "hourly"? formatDate(new Date(item[0])).toLocaleString() : new Date(item[0]).toLocaleString(),
            [coin]: item[1],
            hourlyReturn: ch.toFixed(5)
          }
          max = max < item[1] ? item[1] : max;
          min = min > item[1] ? item[1] : min;
          hmax = hmax < row.hourlyReturn ? row.hourlyReturn : hmax;
          hmin = hmin > row.hourlyReturn ? row.hourlyReturn : hmin;
          return row;
        }
      });
      setMinPrice(min);
      setMaxPrice(max);
      setHMaxReturn(hmax);
      setHminReturn(hmin);
      chartD.splice(chartD.length-2,2);
      dispatch(update_lineData_success(chartD));
      calAvg(chartD)
    }
  }, [coinGeckoResp]);


  return (
    <>
      <NavBarComp></NavBarComp>
      <div>
        <div className="chart-cont">
          <Tabs defaultActiveKey="Price" className="mb-3">
            <Tab eventKey="Price" title="Price Chart">
              {candleObj.isLoading ? 
                <div class="spinner-cont">
                  <div class="lds-hourglass">
                  </div>
                </div>
                :
                <>
                  {(Array.isArray(candleObj.data) && candleObj.data.length > 1) ? 
                    (<CandleStickChart candleData={candleObj} coin={coin} graphWidth={graphWidth} />) 
                      :
                    (<LineChartBoy graphWidth={graphWidth} simpleChart={lineObj.data} setIsDaily={changeDailyHourly} isDaily={isDaily} dMin={minPrice} dMax={maxPrice} hMin={hMinReturn} hMax={hMaxReturn} />)
                  }
                </>
              }
            </Tab>
            <Tab eventKey="Average Return" title="Avg Return Bar Chart">
              <BarChartBoy graphWidth={graphWidthBar} chartSumMdata={avgSumMData} isDaily={isDaily} avgData={avgReturn} chartSumData={avgSumData}/>
            </Tab>
          </Tabs>
        </div>
        <div className="hr-cont">
          <hr></hr>
        </div>
        <div className="table-page">
          <div>
            <SearchBar fetchCandleData={fetchCandleData} />
          </div>
          <div>
            <Table2 screenWidth={screenWidth} simpleChart={lineObj.data}/>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

function mapStateToProps(state) {
  return {
    candleObj: state.chartData.candle,
    lineObj: state.chartData.line
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCandleData: (coin, days) => dispatch(chartActions.fetchCandleStickData(coin, days))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);

