import React from 'react';
import PortfolioOptimization from '../../containers/portfolioOpt';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ConstructionIcon from '@mui/icons-material/Construction';
import useTabNav from '../../hooks/useTabNav';
import CAPM from '../../containers/CAPM/CAPM';
import './portfolioV2.css';

function PortFolioOpt(props) {

	const { a11yProps, TabPanel, handleTabChange, tabValue } = useTabNav();

	return (
		<>
			<div>
				<div className="portfolio-page-tabs-cont">
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={tabValue} onChange={handleTabChange} aria-label="portfolio-tabs" centered>
							<Tab className="nav-tab-btn" label="Efficient Frontier" {...a11yProps(0)} />
							<Tab className="nav-tab-btn" label="CAPM" {...a11yProps(1)} />
							<Tab className="nav-tab-btn" label="Info" {...a11yProps(2)} />
						</Tabs>
					</Box>
				</div>
				<TabPanel value={tabValue} index={0}>
					<PortfolioOptimization/>
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
					<CAPM screenWidth={props.screenWidth} />
				</TabPanel>
				<TabPanel value={tabValue} index={2}>
					<div className="under-construction">
						<ConstructionIcon />
						<span>
							Under construction. Coming Soon...
						</span>
						<ConstructionIcon />
					</div>
				</TabPanel>
			</div>
		</>
	);
}

export default PortFolioOpt;