import RestService from "./wrapper/restService";

const CSDIndexService = () => {
  
  const _serverUr = process.env.REACT_APP_NODE_ENV === "dev" ? 
    process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_SERVER_URL;

  const _fetchGlobal = async ({ interval, start, end }) => {
    try {
      const endpoint = _serverUr + "/public/api/v1/dynamo/global";
      const config = { data: { interval, start, end } };
      const response = await RestService().post(endpoint, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  const _fetchcoin = async ({ coin, interval, start, end }) => {
    try {
      const endpoint = _serverUr + "/public/api/v1/dynamo/coin";
      const config = { data: { coin, interval, start, end } };
      const response = await RestService().post(endpoint, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  const _fetchCSDIndex = async ({ coin, interval, start, end }) => {
    try {
      const endpoint = _serverUr + "/public/api/v1/dynamo/csd-index";
      const config = { data: { coin, interval, start, end } };
      const response = await RestService().post(endpoint, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  const _getBatchCoins = async () => {
    try {
      const endpoint = _serverUr + "/public/api/v1/dynamo/batch/coins";
      const response = await RestService().get(endpoint);
      return response.data.body[0].data; // it happens..
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return {
    fetchGlobal: _fetchGlobal,
    fetchCoin: _fetchcoin,
    fetchCSDIndex: _fetchCSDIndex,
    getBatchCoins: _getBatchCoins
  }
}

export default CSDIndexService;

