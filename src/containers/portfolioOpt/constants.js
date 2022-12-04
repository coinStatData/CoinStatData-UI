const RESP = { 
  "optimal-portfolio": {
      "bitcoin":"9%","ethereum":"11%","litecoin":"6%","dogecoin":"31%","monero":"37%","ripple":"5%","solana":"1%"
    },
    "maximum-perf":{
      "Max_SharpeRatio_Return":-0.6545423,"Max_SharpeRatio_Volitility":0.7944331
    }
}

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const INIT_COINS = ['bitcoin', 'ethereum', 'litecoin', 'dogecoin', 'monero', 'ripple', 'solana'];

const HELPER_TEXTS = {
  daysSelectWarning: 'Must be greater than 100 and less than 600.',
  simSelectInfo: "*Greater number of simulations will take longer to calculate.",
  simSelectWarning:  "Must be greater than 1000 and less than 7000."
}

module.exports = { 
  HELPER_TEXTS, 
  RESP, ITEM_HEIGHT, 
  ITEM_PADDING_TOP, 
  MenuProps, 
  INIT_COINS 
}