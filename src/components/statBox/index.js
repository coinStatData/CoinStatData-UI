import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './statBox.css';

const StatBox = ({ lineData, search }) => {

  const [min, setMin] = useState(Number(lineData.price.minMax.hMinReturn));
  const [max, setMax] = useState(Number(lineData.price.minMax.hMaxReturn));
  
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
