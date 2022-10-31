
const INPUT_ERROR_MSG = "Invalid input. Please try again!";
const NETWORK_ERROR_MSG = "Oopse, something went wrong. Please try again later!";
const RESP = { 
  "optimal-portfolio": {
      "bitcoin":"9%","ethereum":"11%","litecoin":"6%","dogecoin":"31%","monero":"37%","ripple":"5%","solana":"1%"
    },
    "maximum-perf":{
      "Max_SharpeRatio_Return":-0.6545423,"Max_SharpeRatio_Volitility":0.7944331
    }
}

module.exports = { INPUT_ERROR_MSG, NETWORK_ERROR_MSG, RESP }