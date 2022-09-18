import React, { useEffect }  from 'react';
import ApexCharts from 'apexcharts'
import prepCandleData from './util/prepareCandleData';
import './style.css';

function CandleStickChart({ graphWidth, coin, candleChart }) {

  useEffect(() => {
    if(Array.isArray(candleChart) && candleChart.length > 0) {
      const mudatedData = prepCandleData().mutateData(candleChart);
      const title = `${coin.toUpperCase()} Chart`;
      const options = prepCandleData().returnData(mudatedData, graphWidth, title);
      const chartNode = document.querySelector("#candle-chart-cont");
      chartNode.innerHTML = "";
      const graphNode = document.createElement('div'); //FIXME: rendering issue... this is a temp fix 
      graphNode.id = "candle-chart";
      chartNode.appendChild(graphNode);
      const chart = new ApexCharts(document.querySelector("#candle-chart"), options);
      chart.render();
    }
  }, [candleChart, graphWidth]);

  return (
    <div className="chart-cont">
      <div id="candle-chart-cont">
      </div>
    </div>

  );
}

export default CandleStickChart;
