import RestService from "./wrapper/restService";

const pythonLambdaService = () => {
  
  const _serverUr = process.env.REACT_APP_NODE_ENV === "dev" ? 
    process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_SERVER_URL;

  const _invokeLambda = async (action, payload) => {
    try {
      const endpoint = _serverUr + "/public/api/v1/python/statistics";
      const data = { action, ...payload };
      const config = { data }
      const response = await RestService().post(endpoint, config);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return {
    invokePost: _invokeLambda
  }
}

export default pythonLambdaService;

