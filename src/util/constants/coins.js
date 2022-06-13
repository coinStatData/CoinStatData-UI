const COIN_STR = "ethereum,bitcoin,ripple,solana,dogecoin,tether,usd-coin,compound-usd-coin,theta-token,compound-ether,axie-infinity,true-usd,filecoin,decentraland,the-sandbox,apecoin,kucoin-shares,internet-computer,frax,binancecoin,cardano,binance-usd,okb,polkadot,chain-2,wrapped-bitcoin,tron,flow,dai,cosmos,staked-ether,tezos,theta-fuel,hedera-hashgraph,avalanche-2,near,uniswap,shiba-inu,vechain,leo-token,algorand,crypto-com-chain,matic-network,stellar,bitcoin-cash,ftx-token,monero,ethereum-classic,vechai";

const COIN_LIST = COIN_STR.split(",").sort();

module.exports = { COIN_LIST, COIN_STR };
