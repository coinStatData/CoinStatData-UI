import React, { useState, useEffect } from 'react';
import { COIN_STR } from '../../util/constants/coins';
import HomeTable from '../../components/homeTable'
import Trending from '../../components/trending'
import TopRedditPosts from '../../components/topRedditPosts';
import axios from 'axios';
import './styles.css';

function HomePage(props) {
  const [coinData, setCoinData] = useState();
  const [screenWidth, setScreenWidth] = useState();

  useEffect(()=> {
    async function fetchData2() {
      try {
        const gurl = process.env['REACT_APP_GECKO_FETCH_COIN_URL'].replace('@COINS@', COIN_STR);
        let resp = await axios.get(gurl);
        setCoinData(mutateResp(resp));
      } catch(e) {
        console.error(e);
      }
    }
    fetchData2();
    calculateSize();
  }, [])

  const mutateResp = (resp) => {
    let data = resp.data;
    data = Object.keys(data).map((key) => [key, data[key]]);
    data.sort((a,b) => {
      return b[1].usd_market_cap - a[1].usd_market_cap;
    })
    return data;
  }

  const calculateSize = () => {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    setScreenWidth(width);
  }

  window.addEventListener("resize", ()=> {
    calculateSize();
  });

	return (
		<div className="flex-cont">
      <div className="homeTable-box">
        <HomeTable screenWidth={screenWidth} coinData={coinData}/>
      </div>
      <div className="trending-box">
        <Trending/>
        <TopRedditPosts/>
      </div>
		</div>
	)
}

export default HomePage;