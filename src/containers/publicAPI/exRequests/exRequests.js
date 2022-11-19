import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './exRequests.css';

function ExRequests({ APIInfo }) {
	return (
		<>
      <div>
        <strong className="language-title">cURL</strong>
        <code>
          <span className="white-text">curl --location --request </span>
          <span className="red-text text-margins">{APIInfo.method}</span> 
          <span className="green-text text-margins">{APIInfo.url}</span>
          <br/>
          <span className="white-text text-margins">--data-raw</span>
          <span className="green-text">
            {APIInfo.postBody}
          </span>
        </code>
      </div>
      <hr></hr>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color:"white" }} />}
          sx={{backgroundColor: "#303030" }}
        >
          <Typography sx={{ color: "white"}}>NodeJs - Request</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "black" }}>
          <code className="green-code">
            <pre>
              {APIInfo.nodeRequest}
            </pre>
          </code>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color:"white" }} />}
          sx={{ backgroundColor: "#303030" }}
        >
          <Typography sx={{ color: "white"}}>HTTP</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "black" }}>
          <code>
            <div>
              <span className="red-text">POST</span> 
              <span className="white-text text-margins">{APIInfo.uri}</span> 
              <span className="red-text text-margins">HTTP/1.1</span>
            </div>
            <div>
              <span className="red-text">Host:</span> 
              <span className="white-text text-margins">{APIInfo.host}</span>
            </div> 
            <div className="red-text">
              <span className="red-text">Content-Type:</span> 
              <span className="white-text text-margins">{APIInfo.content}</span>
            </div>
            <div className="green-text">{APIInfo.postBody}</div>
          </code>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color:"white" }} />}
          sx={{ backgroundColor: "#303030" }}
        >
          <Typography sx={{ color: "white"}}>Java - OkHttp</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "black" }}>
          <code className="green-code">
            <pre>
              {APIInfo.javaOkHttp}
            </pre>
          </code>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color:"white" }} />}
          sx={{ backgroundColor: "#303030" }}
        >
          <Typography sx={{ color: "white"}}>Sample Response</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "black" }}>
          <code className="green-code">
            <pre>
              {APIInfo.sampleResponse}
            </pre>
          </code>
        </AccordionDetails>
      </Accordion>
		</>
	)
}

export default ExRequests;