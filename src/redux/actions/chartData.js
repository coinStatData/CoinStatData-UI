import * as CandleReducers from '../slices/candleData';
import * as LineReducers from '../slices/lineData';
import { mutateResp } from './util';
import { calAvg } from '../../stat-scripts/calcAverage';
import candleStickService from '../../services/candleStick.service';
import coinDataService from '../../services/coinData.service';

export const fetchCandleStickData = (coin, days) => {
  return async dispatch => {
    //interval = m1, m5, m15, m30, h1, h2, h4, h8, h12, d1, w1
    dispatch(CandleReducers.begin_fetch());
    try {
      const end = Date.now();
      const start = end - (days * 24 * 60 * 60 * 1000);
      const resp = await candleStickService().fetchCandleData({coin, start, end});
      dispatch(CandleReducers.update_success(resp.data));
      return resp.data;
    } catch(e) {
      console.log(e.message);
      dispatch(CandleReducers.update_fail(e.message));
      return false
    }
  }
}

export const fetchLineData = (coin, days, interval) => {
  //just updates line chart data - no stat calculation
  return async dispatch => {
    dispatch(LineReducers.begin_fetch());
    try {
      const resp = await coinDataService().fetchTableData(coin, days, interval);
      dispatch(LineReducers.update_success(resp.data));
      return resp.data;
    } catch(e) {
      console.log(e.message);
      dispatch(LineReducers.update_fail(e.messagee));
      throw e;
    }
  }
}

export const fetchLineDataAndCalculate_price = (coin, days, interval) => {
  //mutate line chart data and update stat
  return async dispatch => {
    dispatch(LineReducers.begin_fetch());
    dispatch(LineReducers.begin_price_calculation());
    try {
      const resp = await coinDataService().fetchTableData(coin, days, interval);
      dispatch(LineReducers.update_success(resp.data));
      const mutatedResp = mutateResp(resp.data['prices'], interval, coin);
      dispatch(LineReducers.update_price_minMax(mutatedResp.minMax));
      dispatch(LineReducers.update_price_chart(mutatedResp.chart));
      const stat = calAvg(mutatedResp.chart, interval);
      dispatch(LineReducers.update_price_stat(stat));
      return true;
    } catch(e) {
      console.log(e.message);
      dispatch(LineReducers.update_fail(e.messagee));
      throw e;
    }
  }
}

export const fetchLineDataAndCalculate_volume = (coin, days, interval) => {
  //mutate line chart data and update stat
  return async dispatch => {
    dispatch(LineReducers.begin_fetch());
    dispatch(LineReducers.begin_volume_calculation());
    try {
      const resp = await coinDataService().fetchTableData(coin, days, interval);
      dispatch(LineReducers.update_success(resp.data));
      const mutatedResp = mutateResp(resp.data['total_volumes'], interval, coin);
      dispatch(LineReducers.update_volume_minMax(mutatedResp.minMax));
      dispatch(LineReducers.update_volume_chart(mutatedResp.chart));
      const stat = calAvg(mutatedResp, interval);
      dispatch(LineReducers.update_volume_stat(stat));
      return true;
    } catch(e) {
      console.log(e.message);
      dispatch(LineReducers.update_fail(e.messagee));
      throw e;
    }
  }
}

