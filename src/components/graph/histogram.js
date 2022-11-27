import React, { useEffect }  from 'react';
import Histogram from "../../stat-scripts/histogram";

import './style.css';

function HistogramD3({ 
  data, 
  width=500, 
  height=300, 
  label="Percent Change", 
  color="steelblue" 
}) {
  
  useEffect (() => {
    const chart = Histogram(data, {
      value: d => d?.return,
      label: label,
      width: width,
      height: height,
      color: color
    });
    const element = document.getElementById("histogram-chart-cont");
    element.innerHTML = "";
    element.appendChild(chart);
  }, [data]);

  return (
    <div id="histogram-chart-cont">
    </div>
  );
}

export default HistogramD3;
