import React from 'react';
import ExRequests from './exRequests/exRequests';
import EndpointInfo from './endpointInfo/endpointInfo';
import { GLOBAl_API, CSD_INDEX_API } from './constants';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import './publicAPI.css';

function PublicAPI(props) {

	return (
		<>
      <div className="public-api-info-bar">
        <Alert severity="info">Crypto API's are still in development process!</Alert>
      </div>
			<div className="publicAPI-outer-cont">
        <div className="publicAPI-inner-row">
          <div className="publicAPI-inner-col-left">
            <EndpointInfo APIInfo={GLOBAl_API}/>
          </div>
          <div className="publicAPI-inner-col-right">
            <ExRequests APIInfo={GLOBAl_API} />
          </div>
        </div>
        <Divider sx={{ m: 2 }}></Divider>
        <div className="publicAPI-inner-row">
          <div className="publicAPI-inner-col-left">
            <EndpointInfo APIInfo={CSD_INDEX_API}/>
          </div>
          <div className="publicAPI-inner-col-right">
            <ExRequests APIInfo={CSD_INDEX_API} />
          </div>
        </div>
			</div>
		</>
	)
}

export default PublicAPI;