import { useState } from 'react';
import Box from '@mui/material/Box';

const useTabNav = () => {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
				{tabValue === index && (
					<Box sx={{ p: 1, pt: 2 }}>
						{children}
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

  return { a11yProps, TabPanel, handleTabChange, tabValue }
}

export default useTabNav;