import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import './infoBar.css';

const InfoBar = (props) => {

  const { title, content } = props;
  
  return (
    <div className="info-bar-cont">
      <Accordion sx={{  }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="accordian-title">{ title }</Typography>
          <InfoIcon sx={{ fontSize:"15px", ml:"5px", mt: "2px" }} /> 
        </AccordionSummary>
        <AccordionDetails>
            { content }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default InfoBar;
