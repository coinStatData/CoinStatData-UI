import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table2 from '../../components/table/table';
import SearchBar from '../../components/searchBar/searchBar';
import LineChartBoy from '../../components/graph/lineChart';
import BarChartBoy from '../../components/graph/barChart';
import CandleStickChart from '../../components/graph/candleStick';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import * as chartActions from '../../redux/actions/chartData';
import { calculateGraphWidth } from '../../util';
import LoadingSpinner from '../../components/spinner/loading';
import ErrorSpinner from '../../components/spinner/error';
import useTabNav from '../../hooks/useTabNav';
import TablePage from './tablePage';
import './style.css';

function StatPage({ screenWidth }) {

  const { a11yProps, TabPanel, handleTabChange, tabValue } = useTabNav();

  return (
    <>
      <div>
        <div className="">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="stat-tabs" centered>
              <Tab className="nav-tab-btn" label="Descriptive" {...a11yProps(0)} />
              <Tab className="nav-tab-btn" disabled label="Inferential" {...a11yProps(1)} />
              <Tab className="nav-tab-btn" disabled label="Advanced" {...a11yProps(2)} />
            </Tabs>
          </Box>
				</div>
				<TabPanel value={tabValue} index={0}>
          <TablePage screenWidth={screenWidth} />
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
          <div>hi</div>
				</TabPanel>
				<TabPanel value={tabValue} index={2}>
          <div>hi</div>
				</TabPanel>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatPage);

