import React, { useState }  from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import './style.css';

function BarChartBoy(props) {

  const sDate = useSelector((state) => state.search.startDate);
  const eDate = useSelector((state) => state.search.endDate);
  const interval = useSelector((state) => state.search.interval);
  const [isMDay, setIsMday] = useState(false);

  const renderGraph = () => {
    return (
      <div className="chart-cont">
        <h4>Average Return by {interval == "hourly"? "Hours" : isMDay? "Days of Month" : "Week Days"}</h4>
        <h6 className="dateHeader">{sDate} ~ {eDate}</h6>
        <BarChart width={props.graphWidth} height={props.graphWidth > 600 ? props.graphWidth/2.5 : props.graphWidth/2} data={isMDay? props.chartSumMdata : props.chartSumData}>
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
            <Button onClick={()=>setIsMday(!isMDay)} className="chart-btn">{!isMDay? "Days of Month" : "Days of Week"}</Button>
          </div>
        }
      </div>
    );
  }

  return (
    renderGraph()
  );
}

export default BarChartBoy;
