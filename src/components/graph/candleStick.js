import React, { useState, useEffect }  from 'react';
import ApexCharts from 'apexcharts'
import prepCandleData from './util/prepareCandleData';
import { checkIfSameArrayCandle } from '../../util';
import './style.css';

function CandleStickChart({ graphWidth, coin, candleData, timezone }) {

  const [candleChartCopy, setCandleChartCopy] = useState([{open: 0, close: 0}]); //copy due to double render
  const [mudatedDataCopy, setMudatedDataCopy] = useState([{x: 0, y: []}]); //copy due to double render

  const renderCandleChart = (data) => {
    let mudatedData = (!checkIfSameArrayCandle(candleData.resp.data, candleChartCopy)) ? 
      prepCandleData().mutateData(data, timezone) : mudatedDataCopy; //reduce calls to mutateData
    setMudatedDataCopy(mudatedData);
    const title = `${coin.toUpperCase()} Chart (${timezone})`;
    const options = prepCandleData().returnData(mudatedData, graphWidth, title);
    const chartNode = document.querySelector("#candle-chart-cont");
    chartNode.innerHTML = "";
    const graphNode = document.createElement('div'); //FIXME: rendering issue... this is a temp fix 
    graphNode.id = "candle-chart";
    chartNode.appendChild(graphNode);
    const chart = new ApexCharts(document.querySelector("#candle-chart"), options);
    chart.render();
  }
  
  useEffect(() => {
    if(!candleData.resp.isLoading 
        && !candleData.resp.isError 
        && Array.isArray(candleData.resp.data) 
        && candleData.resp.data.length > 1
      ) {
      setCandleChartCopy(candleData.resp.data);
      renderCandleChart(candleData.resp.data);
    }
  }, [candleData, graphWidth, timezone]);

  return (
    <div className="chart-cont">
      <div id="candle-chart-cont">
      </div>
    </div>
  );
}

export default CandleStickChart;
