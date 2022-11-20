import React, { useEffect } from 'react';
import { fetchCoinIndex } from '../../redux/actions/coinIndex';
import HomeTable from '../../containers/homeTable'
import Trending from '../../components/trending'
import TopRedditPosts from '../../components/topRedditPosts';
import Chat from '../../containers/chat';
import { useDispatch } from 'react-redux';
import { update_interval } from '../../redux/slices/search';
import { connect } from 'react-redux';
import CoinGecko from '../../components/coinGecko';
import Marquee from '../../containers/marquee';
import './styles.css';

function HomePage({screenWidth, fetchCandleData, fetchCoinIndex, coinIndex}) {

  const dispatch = useDispatch();

  useEffect(() => {
    if(coinIndex.data.length === 0) fetchCoinIndex();
    dispatch(update_interval("daily"));
  }, []);

	return (
    <>
      <Marquee/>
      <div className="flex-cont">
        <div className="homeTable-box">
          <HomeTable 
            fetchCandleData={fetchCandleData} 
            screenWidth={screenWidth} 
            coinIndex={coinIndex}
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
            <div className="chat-inner">
              <br></br>
              <Chat className="coin-chat" />
            </div>
          </div>
          <TopRedditPosts/>
        </div>
      </div>
    </>
	)
}

function mapStateToProps(state) {
  return {
    coinIndex: state.coinIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCoinIndex: () => dispatch(fetchCoinIndex()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
