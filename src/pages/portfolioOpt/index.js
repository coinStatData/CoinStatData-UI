import React from 'react';
import NavBarComp from '../../components/navBar/navBar';
import Footer from '../../components/footer';
import './styles.css';

function PortFolioOpt(props) {

	return (
		<>
			<NavBarComp></NavBarComp>
			<div>
				<div className="iframe-cont">
					<iframe src="/python/portfolio/index.html"/>
				</div>
			</div>
			<Footer></Footer>
		</>
	);
}

export default PortFolioOpt;