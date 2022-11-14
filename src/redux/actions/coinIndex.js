import * as coinIndexReducers from '../slices/coinIndex';
import coinDataService from '../../services/coinData.service';
import { CSD_INDEX, CSD_LIST, STABLE_LIST } from '../../util/constants/coins';

export const fetchCoinIndex = () => {
  return async dispatch => {
    dispatch(coinIndexReducers.begin_fetch());
    try {
      const resp = await coinDataService().fetchHomeData(CSD_INDEX.join());
      let mutatedResp = _mutateResp(resp.data);
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
  const csd50 = CSD_LIST.map((key) => [key, data[key]]);
  const stable10 = STABLE_LIST.map((key) => [key, data[key]]);
  csd50.sort((a,b) => {
    return b[1].usd_market_cap - a[1].usd_market_cap;
  });
  stable10.sort((a,b) => {
    return b[1].usd_market_cap - a[1].usd_market_cap;
  });
  return { csd50, stable10 };
}