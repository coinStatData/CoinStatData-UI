import React, { useState, useContext, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert'
import './styles.css';

function DonatePage(props) {
	const [showAlert, setShowAlert] = useState(true);
	return (
		<div className="donate-cont">
			<div>
				{showAlert &&
					<Alert variant="primary" onClose={() => setShowAlert(false)} dismissible>
						<Alert.Heading>Anything Helps!</Alert.Heading>
						<p className="disclaimer-p">
							Thank you for your support!!
						</p>
					</Alert>
				}
				<div className="single-item-cont">
					<h4>Bitcoin</h4>
					<div>
						<h6>Address:</h6>
						<p>3HtVrftKdYYbEiueesWugdnEHF2aAv4GjT</p>
					</div>
					<div>
						<img src={require("./assets/btc-add.png")}></img>
					</div>
				</div>
				<div className="single-item-cont">
					<h4>Ethereum</h4>
					<div>
						<h6>Address:</h6>
						<p>0x8B644b7Bc27ff8B0A788Eeff8f58438f80c40185</p>
					</div>
					<div>
						<img src={require("./assets/eth-add.png")}></img>
					</div>
				</div>
			</div>
			<div>
				<div className="single-item-cont">
					<h4>USD Coin</h4>
					<div>
						<h6>Address:</h6>
						<p>0x0Cbe30DeCd6fE8c25Be4605f3f0dd870c369c46C</p>
					</div>
					<div>
						<img src={require("./assets/usd-add.png")}></img>
					</div>
				</div>
				<div className="single-item-cont">
					<h4>Litecoin</h4>
					<div>
						<h6>Address:</h6>
						<p>MAhTrKf5ZT65XKKfacTfBB4aTtYn1dFS5N</p>
					</div>
					<div>
						<img src={require("./assets/ltc-add.png")}></img>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DonatePage;