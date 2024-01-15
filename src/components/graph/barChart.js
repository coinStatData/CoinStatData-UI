import React, { useState, useEffect, memo }  from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import './style.css';

const BarChartBoy = memo(function BarChartBoy(props) {

  const { startDate, endDate, interval, volumeOrPrice } = useSelector((state) => state.search);
  const { graphWidth } = props;
  const [isMDay, setIsMday] = useState(false);
  const { price, volume, search } = props.lineData;
  const [data, setData] = useState(volumeOrPrice === "prices" ? price : volume);
  
  useEffect (() => {
    setData(volumeOrPrice === "prices" ? price : volume);
  }, [volumeOrPrice, volume, price]);

  const renderGraph = () => {
    return (
      <div className="chart-cont">
        <h3 className="coinHeader">
          Average Return by {interval == "hourly"? "Hours" : isMDay? "Days of Month" : "Week Days"}
        </h3>
        <div className="dateHeader">
          <strong>({search.timezone}) </strong> 
          {startDate} ~ {endDate}
        </div>
        <BarChart 
          width={graphWidth} 
          height={graphWidth > 600 ? graphWidth/2.5 : graphWidth/2} 
          data={isMDay? data.stat.avgSumMData : data.stat.avgSumData}
        >
          <XAxis dataKey="name" stroke="#8884d8" />
          {props.graphWidth > 600 &&
            <YAxis />
          }
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="avg" fill="#8884d8" barSize={30} />
        </BarChart>
        {interval === "daily" &&
          <div className="btn-cont">
            <Button 
              onClick={() => setIsMday(!isMDay)} 
              className="chart-btn"
            >
              {!isMDay ? "Days of Month" : "Days of Week"}
            </Button>
          </div>
        }
      </div>
    );
  }

  return (
    renderGraph()
  );
});

export default BarChartBoy;
