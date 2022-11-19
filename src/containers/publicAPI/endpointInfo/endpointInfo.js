import React from 'react';
import './endpointInfo.css';

function EndpointInfo({ APIInfo }) {
	return (
		<>
      <div className="endpoint-info-cont">
        <div className="method-title">
          {APIInfo.method}
        </div> 
        <div className="uri-title">
          <code>{APIInfo.uri}</code>
        </div>
        <div className="endpoint-about">
          {APIInfo.info}
        </div>
      </div>
		</>
	)
}

export default EndpointInfo;