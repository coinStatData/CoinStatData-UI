import * as marqueeReducers from '../slices/marquee';
import coinDataService from '../../services/coinData.service';

export const fetchMarquee = (coins) => {
  return async dispatch => {
    dispatch(marqueeReducers.begin_fetch());
    try {
      const resp = await coinDataService().fetchMarqueeData(coins);
      const mutatedResp = _mutateResp(resp);
      dispatch(marqueeReducers.update_success(mutatedResp));
      return mutatedResp;
    } catch(e) {
      console.error(e.message);
      dispatch(marqueeReducers.update_fail(e.message));
      return false;
    }
  }
}

const _mutateResp = (resp) => {
  //throw new Error('Invalid response');
  return resp.data;
} 