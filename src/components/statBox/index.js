import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ErrorSpinner from '../spinner/error';
import LoadingSpinner from '../spinner/loading';
import { useDispatch } from 'react-redux';
//import  * as ss from 'simple-statistics'
import './statBox.css';

const StatBox = ({ lineData, search }) => {

  const dispatch = useDispatch();
  const [min, setMin] = useState(Number(lineData.price.minMax.hMinReturn));
  const [max, setMax] = useState(Number(lineData.price.minMax.hMaxReturn));
  const [mean, setMean] = useState(0);
  const [median, setMedian] = useState(0);
  const [mode, setMode] = useState(0);
  const [range, setRange] = useState(0);
  const [variance, setVariance] = useState(0);
  const [stdDev, setStdDev] = useState(0);
  const [skewness, setSkewness] = useState(0);
  const [kurtosis, setKurtosis] = useState(0);

  useEffect(() => {
    setMin(Number(lineData.price.minMax.hMinReturn));
    setMax(Number(lineData.price.minMax.hMaxReturn));
  }, [lineData.price.minMax]);

  return (
    <div className="stat-cont">
      <h3>Statistics</h3>
      <div className="stat-box">
        <div className="stat-box-col">
          <p>Min Return</p>
          <p>{min}</p>
        </div>
        <div className="stat-box-col">
          <p>Max Return</p>
          <p>{max}</p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    lineData: state.lineData,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatBox);
