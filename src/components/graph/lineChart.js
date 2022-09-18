import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux'
import './style.css';

function LineChartBoy(props) {

  const sDate = useSelector((state) => state.search.startDate);
  const eDate = useSelector((state) => state.search.endDate)
  const coin = useSelector((state) => state.search.coin)

  return (
    <div className="chart-cont">
      <h3 className="coinHeader">{coin.toUpperCase()} {props.isDaily? "Pice" : "Hourly Return"} Chart</h3>
      <h6 className="dateHeader">{sDate} ~ {eDate}</h6>
      <div className="chart-cont-inner">
        <ResponsiveContainer width={props.graphWidth} height={"100%"}>
          <LineChart data={props.simpleChart}
            margin={{ top: 10, bottom: 10 }}>
            <Line type="monotone" dataKey={props.isDaily? coin : "hourlyReturn"} stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} label="TimeStamp" dataKey="name" />
            {props.graphWidth > 650 &&
              <YAxis tick={true} label={props.isDaily? "Price":"% Change"} domain={[props.isDaily? props.dMin : props.hMin, props.isDaily? props.dMax : props.hMax]}/>
            }
            {props.graphWidth <= 650 &&
              //<YAxis tick={false} domain={[props.isDaily?props.dMin:props.hMin, props.isDaily?props.dMax:props.hMax]}/>
              <></>
            }
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="btn-cont">
        <Button onClick={props.setIsDaily} className="chart-btn">{!props.isDaily? "Price Graph":"% Change Graph"}</Button>
      </div>
    </div>
  );
}

export default LineChartBoy;
