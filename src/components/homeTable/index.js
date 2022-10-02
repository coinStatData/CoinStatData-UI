import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import { useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { update_coin } from '../../redux/slices/search';
import * as chartActions from '../../redux/actions/chartData';
import CoinGecko from '../coinGecko';
import './styles.css';

const ICON_PATHS = {
  'matic-network': require('../../assets/matic-network.webp'),
  'stellar': require('../../assets/stellar.webp'),
  'bitcoin-cash': require('../../assets/bitcoin-cash.webp'),
  'ftx-token': require('../../assets/ftx-token.webp'),
  'monero': require('../../assets/monero.webp'),
  'ethereum-classic': require('../../assets/ethereum-classic.webp'),
  'flow': require('../../assets/flow.webp'),
  'dai': require('../../assets/dai.webp'),
  'cosmos': require('../../assets/cosmos.webp'),
  'staked-ether': require('../../assets/staked-ether.webp'),
  'tezos': require('../../assets/tezos.webp'),
  'theta-fuel': require('../../assets/theta-fuel.webp'),
  'hedera-hashgraph': require('../../assets/hedera-hashgraph.webp'),
  'avalanche-2': require('../../assets/avalanche-2.webp'),
  'near': require('../../assets/near.webp'),
  'uniswap': require('../../assets/uniswap.webp'),
  'shiba-inu': require('../../assets/shiba-inu.webp'),
  'vechain': require('../../assets/vechain.webp'),
  'leo-token': require('../../assets/leo-token.webp'),
  'algorand': require('../../assets/algorand.webp'),
  'crypto-com-chain': require('../../assets/crypto-com-chain.webp'),
  'bitcoin': require('../../assets/bitcoin.webp'),
  'ethereum': require('../../assets/ethereum.webp'),
  'ripple': require('../../assets/ripple.webp'),
  'solana': require('../../assets/solana.webp'),
  'dogecoin': require('../../assets/dogecoin.webp'),
  'tether': require('../../assets/tether.webp'),
  'usd-coin': require('../../assets/usd-coin.webp'),
  'compound-usd-coin': require('../../assets/compound-usd-coin.webp'),
  'theta-token': require('../../assets/theta-token.webp'),
  'compound-ether': require('../../assets/compound-ether.webp'),
  'axie-infinity': require('../../assets/axie-infinity.webp'),
  'true-usd': require('../../assets/true-usd.webp'),
  'filecoin': require('../../assets/filecoin.webp'),
  'decentraland': require('../../assets/decentraland.webp'),
  'the-sandbox': require('../../assets/the-sandbox.webp'),
  'apecoin': require('../../assets/apecoin.webp'),
  'kucoin-shares': require('../../assets/kucoin-shares.webp'),
  'internet-computer': require('../../assets/internet-computer.webp'),
  'frax': require('../../assets/frax.webp'),
  'binancecoin': require('../../assets/binancecoin.webp'),
  'cardano': require('../../assets/cardano.webp'),
  'binance-usd': require('../../assets/binance-usd.webp'),
  'okb': require('../../assets/okb.webp'),
  'polkadot': require('../../assets/polkadot.webp'),
  'chain-2': require('../../assets/chain-2.webp'),
  'wrapped-bitcoin': require('../../assets/wrapped-bitcoin.webp'),
  'tron': require('../../assets/tron.webp'),
  'flow': require('../../assets/flow.webp'),
}

function HomeTable(props) {

  let navigate = useNavigate();
  const { screenWidth } = props;
  const dispatch = useDispatch();

  const clickCoin = async (coin) => {
    dispatch(update_coin(coin));
    const respp = props.fetchCandleData(coin, 100);
    navigate("/stat");
  }

  function TableRow(item, index) {
    return (
      <tr onClick={()=>clickCoin(item[0])} key={item[0]}>
        <td>
          {index+1}
        </td>
        <td className="coin-name">
          <img className="coin-icon" src={ICON_PATHS[item[0]]} alt="coin-icon"></img>
          {item[0]}
        </td>
        <td>{item[1].usd}</td>
        <td>{Math.ceil(item[1].usd_market_cap)}</td>
        {((screenWidth > 700 && screenWidth < 1000) || (screenWidth > 1250)) &&
          <td>{Math.ceil(item[1].usd_24h_vol)}</td>
        }
      </tr>
    )
  }
  
  function makeTable(coinData) {
    if(Array.isArray(coinData)) {
      const arr = coinData.map((item, index)=> {
        return TableRow(item, index);
      })
      return arr;
    }
  }

  return (
    <div className="home-table-cont">
      <Table className="home-table" hover responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            {((screenWidth > 700 && screenWidth < 1000) || (screenWidth > 1250)) &&
              <th>24h Volume</th>
            }
          </tr>
        </thead>
        <tbody>
          {
            makeTable(props.coinData)
          }
        </tbody>
      </Table>
      <div className="coinGecko-row">
        <CoinGecko></CoinGecko>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCandleData: (coin, days) => dispatch(chartActions.fetchCandleStickData(coin, days)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTable);
