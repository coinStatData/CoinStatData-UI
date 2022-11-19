import React from 'react';
import PortfolioOptimization from '../../containers/portfolioOpt';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ConstructionIcon from '@mui/icons-material/Construction';
import './portfolioV2.css';

function PortFolioOpt(props) {

	const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	const TabPanel = (props) => {
		const { children, value, index, ...other } = props;
		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography component="span">{children}</Typography>
					</Box>
				)}
			</div>
		);
	}
	
	const a11yProps = (index) => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}
	
	return (
		<>
			<div>
				<div className="">
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label="portfolio-tabs" centered>
								<Tab label="Efficient Frontier" {...a11yProps(0)} />
								<Tab label="CAPM" {...a11yProps(1)} />
								<Tab label="Info" {...a11yProps(2)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<PortfolioOptimization/>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<div className="under-construction">
								<ConstructionIcon />
								<span>
									Under construction. Coming Soon...
								</span>
								<ConstructionIcon />
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div className="under-construction">
								<ConstructionIcon />
								<span>
									Under construction. Coming Soon...
								</span>
								<ConstructionIcon />
							</div>
						</TabPanel>
					</Box>
				</div>
			</div>
		</>
	);
}

export default PortFolioOpt;