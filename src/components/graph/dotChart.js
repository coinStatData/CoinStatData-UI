import React  from 'react';
import Tooltip from '@mui/material/Tooltip';
import { formatDate } from '../../util'
import './style.css';

function DotChart({ lineData, timezone }) {
  
  const dot = (data, index) => {
    if(data === null || data === undefined) return;
    const dotColor = +data?.return < 0 ? 'red-dot' : 'green-dot';
    return (
      <Tooltip key={index} title={formatDate(data?.name, 'default', timezone)} arrow>
        <span className={"dot " + dotColor}>
        </span>
      </Tooltip>
    )
  }

  return (
    <div className="dot-chart-outer-cont">
      <div className="dot-chart-cont">
        {
          lineData.price?.chart?.data?.map((entry, index) => dot(entry, index))
        }
      </div>
      <div className="legend-cont">
        <div className="legend-inner">
          <strong>Negative Return: </strong>
          <span className="dot red-dot"></span>
        </div>
        <div className="legend-inner">
          <strong>Positive Return: </strong>
          <span className="dot green-dot"></span>
        </div>
      </div>
      <div className="dot-chart-exp">
        <i>**Each Dot represents day/hour</i>
      </div>
    </div>
  );
}

export default DotChart;
