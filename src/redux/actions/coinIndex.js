import * as coinIndexReducers from '../slices/coinIndex';
import coinDataService from '../../services/coinData.service';
import { COIN_STR } from '../../util/constants/coins';

export const fetchCoinIndex = () => {
  return async dispatch => {
    dispatch(coinIndexReducers.begin_fetch());
    try {
      const resp = await coinDataService().fetchHomeData(COIN_STR);
      const mutatedResp = _mutateResp(resp.data);
      dispatch(coinIndexReducers.update_success(mutatedResp));
      return mutatedResp;
    } catch(e) {
      console.error(e.message);
      dispatch(coinIndexReducers.update_fail(e.message));
      return false;
    }
  }
}

const _mutateResp = (resp) => {
  let data = resp.data;
  data = Object.keys(data).map((key) => [key, data[key]]);
  data.sort((a,b) => {
    return b[1].usd_market_cap - a[1].usd_market_cap;
  })
  return data;
}