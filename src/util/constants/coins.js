const COIN_STR = "ethereum,bitcoin,ripple,solana,dogecoin,tether,usd-coin,compound-usd-coin,theta-token,compound-ether,axie-infinity,true-usd,filecoin,decentraland,the-sandbox,apecoin,kucoin-shares,internet-computer,frax,binancecoin,cardano,binance-usd,okb,polkadot,chain-2,wrapped-bitcoin,tron,flow,dai,cosmos,staked-ether,tezos,theta-fuel,hedera-hashgraph,avalanche-2,near,uniswap,shiba-inu,vechain,leo-token,algorand,crypto-com-chain,matic-network,stellar,bitcoin-cash,ftx-token,monero,ethereum-classic,vechai";

const COIN_LIST = COIN_STR.split(",").sort();

const CSD_STR = "bitcoin,ethereum,dash,aptos,zcash,ripple,solana,dogecoin,theta-token,axie-infinity,filecoin,decentraland,the-sandbox,apecoin,kucoin-shares,internet-computer,maker,binancecoin,quant-network,cardano,okb,polkadot,chain-2,wrapped-bitcoin,tron,flow,cosmos,tezos,theta-fuel,hedera-hashgraph,avalanche-2,near,uniswap,shiba-inu,vechain,leo-token,algorand,matic-network,stellar,bitcoin-cash,monero,ethereum-classic,eos,klay-token,pancakeswap-token,neo,helium,evmos,the-graph,fantom";

const CSD_LIST = [
  'bitcoin',           'ethereum',      'dash',
  'aptos',             'zcash',         'ripple',
  'solana',            'dogecoin',      'theta-token',
  'axie-infinity',     'filecoin',      'decentraland',
  'the-sandbox',       'apecoin',       'kucoin-shares',
  'internet-computer', 'maker',         'binancecoin',
  'quant-network',     'cardano',       'okb',
  'polkadot',          'chain-2',       'wrapped-bitcoin',
  'tron',              'flow',          'cosmos',
  'tezos',             'theta-fuel',    'hedera-hashgraph',
  'avalanche-2',       'near',          'uniswap',
  'shiba-inu',         'vechain',       'leo-token',
  'algorand',          'matic-network', 'stellar',
  'bitcoin-cash',      'monero',        'ethereum-classic',
  'eos',               'klay-token',    'pancakeswap-token',
  'neo',               'helium',        'evmos',
  'the-graph',         'fantom'
];

const STABLE_LIST = ["tether", "usd-coin","binance-usd","dai","frax","true-usd","usdd","gemini-dollar","paxos-standard","compound-usd-coin"];

const CSD_INDEX = [
  'algorand',       'apecoin',           'aptos',
  'avalanche-2',    'axie-infinity',     'binance-usd',
  'binancecoin',    'bitcoin',           'bitcoin-cash',
  'cardano',        'chain-2',           'compound-usd-coin',
  'cosmos',         'dai',               'dash',
  'decentraland',   'dogecoin',          'eos',
  'ethereum',       'ethereum-classic',  'evmos',
  'fantom',         'filecoin',          'flow',
  'frax',           'gemini-dollar',     'hedera-hashgraph',
  'helium',         'internet-computer', 'klay-token',
  'kucoin-shares',  'leo-token',         'maker',
  'matic-network',  'monero',            'near',
  'neo',            'okb',               'pancakeswap-token',
  'paxos-standard', 'polkadot',          'quant-network',
  'ripple',         'shiba-inu',         'solana',
  'stellar',        'tether',            'tezos',
  'the-graph',      'the-sandbox',       'theta-fuel',
  'theta-token',    'tron',              'true-usd',
  'uniswap',        'usd-coin',          'usdd',
  'vechain',        'wrapped-bitcoin',   'zcash'
];

module.exports = { COIN_LIST, COIN_STR, STABLE_LIST, CSD_LIST, CSD_STR, CSD_INDEX };
