import React, { useEffect }  from 'react';
import ApexCharts from 'apexcharts'
import './style.css';

function TreeMapChart({ graphWidth, coin, candleData }) {
      
  var options = {
    series: [
    {
      data: [
        {
          x: 'INTC',
          y: 1.2
        },
        {
          x: 'GS',
          y: 0.4
        }
      ]
    }
  ],
    legend: {
    show: false
  },
  chart: {
    height: 350,
    type: 'treemap'
  },
  title: {
    text: 'Treemap with Color scale'
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
    },
    formatter: function(text, op) {
      return [text, op.value]
    },
    offsetY: -4
  },
  plotOptions: {
    treemap: {
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      colorScale: {
        ranges: [
          {
            from: -6,
            to: 0,
            color: '#CD363A'
          },
          {
            from: 0.001,
            to: 6,
            color: '#52B12C'
          }
        ]
      }
    }
  }
  };
  // const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance')

  // tradeWs.onmessage = function (msg) {
  //   console.log(msg.data)
  // }

  const renderCandleChart = () => {
    const chartNode = document.querySelector("#treeMap-chart-cont");
    chartNode.innerHTML = "";
    const graphNode = document.createElement('div'); //FIXME: rendering issue... this is a temp fix 
    graphNode.id = "treeMap-chart";
    chartNode.appendChild(graphNode);
    var chart = new ApexCharts(document.querySelector("#treeMap-chart"), options);
    chart.render();
  }
  
  useEffect(() => {
    renderCandleChart();
  }, []);


  return (
    <div className="chart-cont">
      <div id="treeMap-chart-cont">
      </div>
    </div>

  );
}

export default TreeMapChart;
