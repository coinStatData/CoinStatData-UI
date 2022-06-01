import React, { useState, useContext, useEffect } from 'react';
import Table2 from '../../components/table/table';
import SearchBar from '../../components/searchBar/searchBar';
import LineChartBoy from '../../components/graph/lineChart';
import BarChartBoy from '../../components/graph/barChart';
import UserContext from '../../context/userContext';
import { formatDate } from '../../util'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import './style.css';

function TablePage(props) {
  const {coin_g, resp_g, cResp_g, interval_g, update_g } = useContext(UserContext);
  const [avgReturn, setAvgReturn] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [hMinReturn, setHminReturn] = useState(0);
  const [hMaxReturn, setHMaxReturn] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [isDaily, setIsDaily] = useState(true);
  const [avgSumData, setAvgSumData] = useState([]);
  const [avgSumMData, setAvgSumMData] = useState([]);
  const [avgMReturn, setAvgMReturn] = useState({});

  const changeDailyHourly = () => {
    setIsDaily(!isDaily);
  }

  const calAvg = (chartD) => {
    if(Array.isArray(chartD) && chartD.length>0) {
      let dObj = {};
      let mObj = {};
      let mdic = {};
      let dic = {};
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
        if(interval_g == "daily") {
          time = weekDic[(chartD[i]["name"].getDay())];
          mday = chartD[i]["name"].getDate();
          console.log("%%%mday ", mday)
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
        if(interval_g == "daily") {
          time = weekDic[(chartD[i]["name"].getDay())];
          mday = chartD[i]["name"].getDate();
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
      console.log("### avg return: ", dObj);
      let avgSumData = [];
      //hourly and days of week
      for(let d in dic) {
        let temp = {
          name: dic[d],
          avg: dObj[d+"_avg"],
          count: dObj[d+"_count"],
          sum: dObj[d],
        }
        avgSumData.push(temp);
      }
      setAvgSumData(avgSumData);

      if(interval_g == "daily") {
        //month days
        let marr = [];
        for(let d in mdic) {
          let temp = {
            name: mdic[d],
            avg: mObj[d+"_avg"].toFixed(5),
            count: mObj[d+"_count"],
            sum: mObj[d].toFixed(5),
          }
          marr.push(temp);
        }
        console.log("### avg monthly sum data: ", marr);
        setAvgSumMData(marr);
      }
    }
  }

  useEffect(() => {
    //this is for lambda api
    if(Array.isArray(resp_g)) {
      let max = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let hmax = -100;
      let hmin = 100;

      let chartD = resp_g.map((item, index) => {
        if(index+2 < resp_g.length) {
          let ch = (resp_g[index+1].price - item.price)/item.price * 100;
          let row = {
            name: formatDate(new Date(item.datetime* 1000)),
            [coin_g]: item.price,
            hourlyReturn: ch.toFixed(5)
          }
          max = max < item.price ? item.price : max;
          min = min > item.price ? item.price : min;
          hmax = hmax < row.hourlyReturn ? row.hourlyReturn : hmax;
          hmin = hmin > row.hourlyReturn ? row.hourlyReturn : hmin;
          return row;
        }
      });
      setMinPrice(min);
      setMaxPrice(max);
      setHMaxReturn(hmax);
      setHminReturn(hmin);
      console.log("### chardata = == ", chartD);
      setChartData(chartD);
      update_g(chartD, 'chartD');
      calAvg(chartD);
    }
  }, [resp_g]);

  useEffect(() => {
     //this is for coin gecko api
    if(Array.isArray(resp_g)) {
      let max = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let hmax = -100;
      let hmin = 100;
      let chartD = cResp_g.map((item, index) => {
        if(index+2 < cResp_g.length) {
          let ch = (cResp_g[index+1][1] - item[1])/item[1] * 100;
          let row = {
            name: interval_g == "hourly"? formatDate(new Date(item[0])) : new Date(item[0]),
            [coin_g]: item[1],
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
      console.log("### chardata = == ", chartD);
      setChartData(chartD);
      update_g(chartD, 'chartD');
      calAvg(chartD)
    }
  }, [cResp_g]);

  return (
    <div>
      <div className="chart-cont">
        <Tabs defaultActiveKey="Price" className="mb-3">
          <Tab eventKey="Price" title="Line Graph">
            <LineChartBoy chartData={chartData} setIsDaily={changeDailyHourly} isDaily={isDaily} dMin={minPrice} dMax={maxPrice} hMin={hMinReturn} hMax={hMaxReturn} />
          </Tab>
          <Tab eventKey="Average Return" title="Avg Return Bar Chart">
            <BarChartBoy chartSumMdata={avgSumMData} isDaily={isDaily} avgData={avgReturn} chartSumData={avgSumData}/>
          </Tab>
        </Tabs>
      </div>
      <div className="hr-cont">
        <hr></hr>
      </div>
      <div className="table-page">
        <div>
          <SearchBar/>
        </div>
        <div>
          <Table2 chartData={chartData}/>
        </div>
      </div>
    </div>
  );
}

export default TablePage;
