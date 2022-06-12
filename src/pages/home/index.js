import React, { useState, useContext, useEffect } from 'react';
import { COIN_LIST, COIN_STR } from '../../util/constants/coins';
import HomeTable from '../../components/homeTable'
import axios from 'axios';
import './styles.css';

function HomePage(props) {
  const [coinData, setCoinData] = useState();

  useEffect(()=> {
    async function fetchData2() {
      try {
        let resp = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${COIN_STR}&vs_currencies=usd&include_market_cap=true&include_last_updated_at=true&include_24hr_vol=true`);
        setCoinData(mutateResp(resp));
      } catch(e) {
        console.log(e);
      }
    }
    fetchData2();
  }, [])

  const mutateResp = (resp) => {
    let data = resp.data;
    data = Object.keys(data).map((key) => [key, data[key]]);
    data.sort((a,b) => {
      return b[1].usd_market_cap - a[1].usd_market_cap;
    })
    console.log(data);
    return data;
  } 


	return (
		<div>
			<HomeTable coinData={coinData}/>
		</div>
	)
}

export default HomePage;