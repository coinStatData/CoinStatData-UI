import RestService from "./wrapper/restService";

const coinDataService = () => {
  
  const _serverUr = process.env.REACT_APP_NODE_ENV === "dev" ? 
    process.env.REACT_APP_DEV_SERVER_URL : process.env.SERVER_URL;

  const _fetchHomeData = async (coins) => {
    try {
      const response = await RestService().get(_serverUr + "/public/api/v1/home/coins?coins=" + coins);
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  const _fetchTableData = async (coin, days, interval) => {
    try {
      const query = "coin=" + coin + "&days=" + days + "&interval=" + interval;
      const response = await RestService().get(_serverUr + "/public/api/v1/table/coin?" + query);
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return {
    fetchHomeData: _fetchHomeData,
    fetchTableData:_fetchTableData
  }
}

export default coinDataService;

