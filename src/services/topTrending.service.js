import RestService from "./wrapper/restService";

const topTrendingService = () => {
  
  const _serverUr = process.env.REACT_APP_NODE_ENV === "dev" ? 
    process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_SERVER_URL;

  // const _serverUr =  process.env.REACT_APP_SERVER_URL;

  const _fetchCoins = async () => {
    try {
      const response = await RestService().get(_serverUr + "/public/api/v1/top/trending/coins");
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  const _fetchReddit = async (subReddit) => {
    try {
      const response = await RestService().get(_serverUr + "/public/api/v1/top/trending/reddit?sub=" + subReddit);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  return {
    fetchCoins: _fetchCoins,
    fetchReddit: _fetchReddit
  }
}

export default topTrendingService;
