import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux'
import './style.css';

function LineChartBoy(props) {

  const { startDate, endDate, coin, volumeOrPrice } = useSelector((state) => state.search);
  const { timezone } = useSelector((state) => state.userSettings);
  const { price, volume, search } = props.lineData;
  const [data, setData] = useState(volumeOrPrice === "prices" ? price : volume);
  
  useEffect (() => {
    setData(volumeOrPrice === "prices" ? price : volume);
  }, [volumeOrPrice, price, volume, timezone]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{`${payload}`}</p>
          <p className="desc">label.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-cont">
      <h3 className="coinHeader">
        {coin.toUpperCase()} {props.isDaily? "Pice" : "Hourly Return"} Chart
      </h3>
      <h6 className="dateHeader">
        {search.timezone}: {startDate}~{endDate}
      </h6>
      <div className="chart-cont-inner">
        <ResponsiveContainer width={props.graphWidth} height={"100%"}>
          <LineChart 
            data={data.chart.data}
            margin={{ top: 10, bottom: 10 }}
          >
            <Line type="monotone" dataKey={props.isDaily? coin : "hourlyReturn"} stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} label="TimeStamp" dataKey="name" />
            {props.graphWidth > 650 &&
              <YAxis 
                tick={true} 
                label={props.isDaily? "Price":"% Change"} 
                domain={[
                  props.isDaily? data.minMax.min : data.minMax.hMinReturn, 
                  props.isDaily? data.minMax.max : data.minMax.hMaxReturn
                ]}
              />
            }
            {props.graphWidth <= 650 &&
              //<YAxis tick={false} domain={[props.isDaily?props.dMin:props.hMin, props.isDaily?props.dMax:props.hMax]}/>
              <></>
            }
            <Tooltip/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="btn-cont">
        <Button onClick={props.setIsDaily} className="chart-btn">
          {!props.isDaily? "Price Graph":"% Change Graph"}
        </Button>
      </div>
    </div>
  );
}

export default LineChartBoy;
