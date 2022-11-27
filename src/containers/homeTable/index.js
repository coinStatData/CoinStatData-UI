import React, { useEffect } from 'react';
import { fetchCoinIndex } from '../../redux/actions/coinIndex';
import CSD50 from './CSD50';
import GlobalIndex from './globalIndex';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import InfoBar from './infoBar';
import CSDIndexInfo from './infoBar/infoContents/CSDIndex';
import GlobalIndexInfo from './infoBar/infoContents/globalIndex';
import { useDispatch } from 'react-redux';
import { update_interval } from '../../redux/slices/search';
import { connect } from 'react-redux';
import useTabNav from '../../hooks/useTabNav';
import './homeTable.css';

function HomeTable(props) {

  const { screenWidth, coinIndex, fetchCoinIndex } = props;
  const dispatch = useDispatch();
  const { a11yProps, TabPanel, handleTabChange, tabValue } = useTabNav();

  useEffect(() => {
    if(coinIndex.data.length === 0) fetchCoinIndex();
    dispatch(update_interval("daily"));
  }, []);

  return (
    <div className="home-table-cont">
      <div className="home-table-inner">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              centered={screenWidth < 1000 ? true : false} 
              value={tabValue} onChange={handleTabChange} 
              aria-label="home index tabs"
            >
              <Tab 
                className="tab-title"
                label="CSD50 Index"
                {...a11yProps(0)} 
              />
              <Tab 
                className="tab-title"
                label={screenWidth < 650 ? "CSD10 Index" : "CSD10 Stable Index"}
                {...a11yProps(1)} 
              />
              <Tab 
                className="tab-title" 
                label="CSD60 Aggregate" 
                {...a11yProps(2)} 
              />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <CSD50 screenWidth={screenWidth} index={"data"} coinIndex={coinIndex} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <InfoBar content={<CSDIndexInfo/>} title={"About CSD Indices"} />
            <CSD50 screenWidth={screenWidth} index={"stableData"} coinIndex={coinIndex} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <InfoBar content={<GlobalIndexInfo/>} title={"About CSD60 Aggregate"} />
            <GlobalIndex screenWidth={screenWidth} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    coinIndex: state.coinIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCoinIndex: () => dispatch(fetchCoinIndex()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTable);