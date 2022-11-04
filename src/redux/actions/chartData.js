import * as CandleReducers from '../slices/candleData';
import * as LineReducers from '../slices/lineData';
import { calAvg } from '../../stat-scripts/calcAverage';
import candleStickService from '../../services/candleStick.service';
import coinDataService from '../../services/coinData.service';
import { formatDate } from '../../util';

const _mutateResp = (resp, interval, coin) => {
  if(Array.isArray(resp) && resp.length>1) {
    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    let hmax = -100;
    let hmin = 100;
    const chartD = resp.map((item, index) => {
      if(index < resp.length-2) {
        const ch = (resp[index+1][1] - item[1])/item[1] * 100;
        const row = {
          name: interval == "hourly"? formatDate(new Date(item[0])).toLocaleString() : new Date(item[0]).toLocaleString(),
          [coin]: item[1],
          hourlyReturn: ch.toFixed(5)
        }
        max = max < item[1] ? item[1] : max;
        min = min > item[1] ? item[1] : min;
        hmax = hmax < row.hourlyReturn ? row.hourlyReturn : hmax;
        hmin = hmin > row.hourlyReturn ? row.hourlyReturn : hmin;
        return row;
      }
    });
    return {
      chart: chartD,
      minMax: {
        max: max,
        min: min,
        hMaxReturn: hmax,
        hMinReturn: hmin
      }
    }
  }
}

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
      const mutatedResp = _mutateResp(resp.data['prices'], interval, coin);
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
      const mutatedResp = _mutateResp(resp.data['total_volumes'], interval, coin);
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

