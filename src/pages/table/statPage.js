import React from 'react';
import { connect } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useTabNav from '../../hooks/useTabNav';
import TablePage from './descriptive/descriptive';
import Inferential from './inferential/inferential';
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
              <Tab className="nav-tab-btn" label="Inferential" {...a11yProps(1)} />
              <Tab className="nav-tab-btn" disabled label="Advanced" {...a11yProps(2)} />
            </Tabs>
          </Box>
				</div>
				<TabPanel value={tabValue} index={0}>
          <TablePage screenWidth={screenWidth} />
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
          <Inferential screenWidth={screenWidth} />
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

