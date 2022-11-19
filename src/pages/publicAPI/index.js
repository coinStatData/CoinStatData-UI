import React from 'react';
import PublicAPI from '../../containers/publicAPI/publicAPI';
import './publicAPI.css';

function PublicAPIPage(props) {
	return (
		<>
			<div className="publicAP-page-cont">
				<PublicAPI />
			</div>
		</>
	)
}

export default PublicAPIPage;