import React from 'react';
import Footer from '../../components/footer';
import './styles.css';

function PortFolioOpt(props) {

	return (
		<>
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