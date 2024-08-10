import React from 'react';
import HomeTable from '../../containers/homeTable'
import Trending from '../../components/trending'
import TopRedditPosts from '../../components/topRedditPosts';
import Chat from '../../containers/chat';
import CoinGecko from '../../components/coinGecko';
import Marquee from '../../containers/marquee';
import Alert from 'react-bootstrap/Alert'
import { DISCLAIMER } from './constants';

import './home.css';

function HomePage({ screenWidth }) {

	return (
    <>
      <Marquee/>
      <div className="disclaimer-cont">
        <Alert className="disclaimer-alert" variant="danger">
          <Alert.Heading>Important Disclaimer!</Alert.Heading>
          <div className="disclaimer-p">
            {DISCLAIMER}
          </div>
        </Alert>
      </div>
      <div className="flex-cont">
        <div className="homeTable-box">
          <HomeTable 
            screenWidth={screenWidth} 
          />
        </div>
        <div className="trending-box">
          {/* <div className="flex-item">
            <TreeMapChart></TreeMapChart>
          </div> */}
          <div className="flex-item">
            <div className="trending-inner">
              <Trending/>
              <CoinGecko/>
            </div>
            {screenWidth > 1000 && 
              <div className="chat-inner">
                <br></br>
                <Chat className="coin-chat" />
              </div>
            }
          </div>
          <TopRedditPosts/>
        </div>
      </div>
    </>
	);
}

export default HomePage;
