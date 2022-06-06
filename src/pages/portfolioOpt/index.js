import React, { useState, useContext, useEffect } from 'react';
import NavBarComp from '../../components/navBar/navBar';
import './styles.css';

function PortFolioOpt(props) {

	return (
		<div className="iframe-cont">
			<NavBarComp></NavBarComp>
			<iframe src="/python/capm/index.html"/>
		</div>
	);
}

export default PortFolioOpt;