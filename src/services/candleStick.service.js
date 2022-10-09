import RestService from "./wrapper/restService";

const candleStickService = () => {
  
  const _serverUr = process.env.REACT_APP_NODE_ENV === "dev" ? 
    process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_SERVER_URL;

    // const _serverUr =  process.env.REACT_APP_SERVER_URL;

  const _fetchCandleData = async ({coin: coin, start: start, end: end}) => {
    //TODO: check if coin is valid
    try {
      const query = "coin=" + coin + "&start=" + start + "&end=" + end;
      const response = await RestService().get(_serverUr + "/public/api/v1/candle-chart/coin?" + query);
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  
  return {
    fetchCandleData: _fetchCandleData
  }
}

export default candleStickService;

