import React, { useContext, useState }  from 'react';
import UserContext from '../../context/userContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import './style.css';

function BarChartBoy(props) {

  const { interval_g } = useContext(UserContext);

  const sDate = useSelector((state) => state.startDate.value);
  const eDate = useSelector((state) => state.endDate.value);
  const [isMDay, setIsMday] = useState(false);

  return (
    <div className="chart-cont">
      <h3>Average Return by {interval_g == "hourly"? "Hours": isMDay? "Days of Month":"Week Days"}</h3>
      <h6>{sDate} ~ {eDate}</h6>
      <BarChart width={900} height={400} data={isMDay? props.chartSumMdata:props.chartSumData}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="avg" fill="#8884d8" barSize={30} />
      </BarChart>
      {interval_g=="daily" &&
        <div className="btn-cont">
          <Button onClick={()=>setIsMday(!isMDay)} className="chart-btn">{!isMDay? "Days of Month":"Days of Week"}</Button>
        </div>
      }

    </div>
  );
}

export default BarChartBoy;
