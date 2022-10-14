import * as TrendingCoinsReducer from '../slices/trendingCoins';
import topTrendingService from '../../services/topTrending.service';

export const fetchTrendingCoins = () => {
  return async dispatch => {
    dispatch(TrendingCoinsReducer.begin_fetch());
    try {
      const resp = await topTrendingService().fetchCoins();
      const mutatedResp = _mutateResp(resp);
      dispatch(TrendingCoinsReducer.update_success(mutatedResp));
      return mutatedResp;
    } catch(e) {
      console.error(e.message);
      dispatch(TrendingCoinsReducer.update_fail(e.message));
      return false;
    }
  }
}

const _mutateResp = (resp) => {
  if(Array.isArray(resp.data?.coins) && resp.data.coins.length > 0) { 
    return resp.data.coins;
  }
  throw new Error('Invalid response');
} 