import React from 'react';
import CSD50 from './CSD50';
import GlobalIndex from './globalIndex';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabPanel from './tabPanel';
import Tabs from '@mui/material/Tabs';
import InfoBar from './infoBar';
import CSDIndexInfo from './infoBar/infoContents/CSDIndex';
import GlobalIndexInfo from './infoBar/infoContents/globalIndex';
import './homeTable.css';

function a11yProps(index) {
  return {
    id: `home-tab-${index}`,
    'aria-controls': `homeTable-tabpanel-${index}`,
  };
}

function HomeTable(props) {

  const { screenWidth, coinIndex } = props;
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="home-table-cont">
      <div className="home-table-inner">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              centered={screenWidth < 1000 ? true : false} 
              value={value} onChange={handleTabChange} 
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
                label="Global Index" 
                {...a11yProps(2)} 
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CSD50 screenWidth={screenWidth} index={"data"} coinIndex={coinIndex} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InfoBar content={<CSDIndexInfo/>} title={"About CSD Indices"} />
            <CSD50 screenWidth={screenWidth} index={"stableData"} coinIndex={coinIndex} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <InfoBar content={<GlobalIndexInfo/>} title={"About CSD Global Index"} />
            <GlobalIndex screenWidth={screenWidth} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default HomeTable;