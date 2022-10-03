import { update_candleData_success, begin_candle_fetch, update_candleData_fail } from '../slices/chartData';
import candleStickService from '../../services/candleStick.service';

export const fetchCandleStickData = (coin, days) => {
  return async dispatch => {
    //interval = m1, m5, m15, m30, h1, h2, h4, h8, h12, d1, w1
    dispatch(begin_candle_fetch());
    try {
      const end = Date.now()
      const start = end - (days * 24 * 60 * 60 * 1000);
      const resp = await candleStickService().fetchCandleData({coin, start, end});
      console.log("#################candel success")
      dispatch(update_candleData_success(resp.data))
      return resp.data;
    } catch(e) {
      console.log(e.message);
      dispatch(update_candleData_fail(e))
    }
  }
}
