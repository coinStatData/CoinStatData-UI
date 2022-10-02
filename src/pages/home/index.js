import React, { useState, useEffect } from 'react';
import { COIN_STR } from '../../util/constants/coins';
import HomeTable from '../../components/homeTable'
import Trending from '../../components/trending'
import TopRedditPosts from '../../components/topRedditPosts';
import NavBarComp from '../../components/navBar/navBar';
import Chat from '../../components/chat';
import Footer from '../../components/footer';
import { useDispatch } from 'react-redux';
import { update_interval } from '../../redux/slices/search';
import coinDataService from '../../services/coinData.service';
import TreeMapChart from '../../components/graph/treeMap';
import { connect } from 'react-redux';
import CoinGecko from '../../components/coinGecko';
import './styles.css';

function HomePage({screenWidth, fetchCandleData}) {
  const [coinData, setCoinData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData2() {
      const resp = await coinDataService().fetchHomeData(COIN_STR);
      setCoinData(mutateResp(resp.data));
    }
    fetchData2();
    dispatch(update_interval("daily"));
  }, [])

  const mutateResp = (resp) => {
    let data = resp.data;
    data = Object.keys(data).map((key) => [key, data[key]]);
    data.sort((a,b) => {
      return b[1].usd_market_cap - a[1].usd_market_cap;
    })
    return data;
  }

	return (
    <>
      <NavBarComp></NavBarComp>

      <div className="flex-cont">
        <div className="homeTable-box">
          <HomeTable fetchCandleData={fetchCandleData} screenWidth={screenWidth} coinData={coinData}/>
        </div>
        <div className="trending-box">

          {/* <div className="flex-item">
            <TreeMapChart></TreeMapChart>
          </div> */}
          <Trending/>
          <CoinGecko></CoinGecko>
          <br></br>
          <Chat className="coin-chat"></Chat>
          <TopRedditPosts/>

        </div>
      </div>
      <Footer></Footer>
    </>
	)
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
