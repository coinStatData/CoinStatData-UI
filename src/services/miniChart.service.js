import RestService from "./wrapper/restService";

const miniChartService = () => {
  
  const _serverUr = process.env.REACT_APP_NODE_ENV === "dev" ? 
    process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_SERVER_URL;

  const _fetchCharts = async ({ coins }) => {
    try {
      const endpoint = _serverUr + "/public/api/v1/sparkline/charts";
      const config = { data: { coins } };
      const response = await RestService().post(endpoint, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return {
    fetchCharts: _fetchCharts,
  }
}

export default miniChartService;

