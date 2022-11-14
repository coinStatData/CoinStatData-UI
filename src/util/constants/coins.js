const COIN_STR = "ethereum,bitcoin,ripple,solana,dogecoin,tether,usd-coin,compound-usd-coin,theta-token,compound-ether,axie-infinity,true-usd,filecoin,decentraland,the-sandbox,apecoin,kucoin-shares,internet-computer,frax,binancecoin,cardano,binance-usd,okb,polkadot,chain-2,wrapped-bitcoin,tron,flow,dai,cosmos,staked-ether,tezos,theta-fuel,hedera-hashgraph,avalanche-2,near,uniswap,shiba-inu,vechain,leo-token,algorand,crypto-com-chain,matic-network,stellar,bitcoin-cash,ftx-token,monero,ethereum-classic,vechai";

const COIN_LIST = COIN_STR.split(",").sort();

const CSD_STR = "bitcoin,ethereum,dash,aptos,zcash,ripple,solana,dogecoin,theta-token,axie-infinity,filecoin,decentraland,the-sandbox,apecoin,kucoin-shares,internet-computer,maker,binancecoin,quant-network,cardano,okb,polkadot,chain-2,wrapped-bitcoin,tron,flow,cosmos,tezos,theta-fuel,hedera-hashgraph,avalanche-2,near,uniswap,shiba-inu,vechain,leo-token,algorand,matic-network,stellar,bitcoin-cash,monero,ethereum-classic,eos,klay-token,pancakeswap-token,neo,helium,evmos,the-graph,fantom";

const CSD_LIST = CSD_STR.split(',');

const STABLE_LIST = ["tether", "usd-coin","binance-usd","dai","frax","true-usd","usdd","gemini-dollar","paxos-standard","compound-usd-coin"];

const CSD_INDEX = [ ...CSD_LIST, ...STABLE_LIST].sort();

module.exports = { COIN_LIST, COIN_STR, STABLE_LIST, CSD_INDEX, CSD_LIST, CSD_STR };
