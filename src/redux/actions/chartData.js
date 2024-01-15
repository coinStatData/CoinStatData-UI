import * as CandleReducers from '../slices/candleData';
import * as CandleV2Reducers from '../slices/candleDataV2';
import * as LineReducers from '../slices/lineData';
import { calAvg } from '../../stat-scripts/average/calcAverage';
import candleStickService from '../../services/candleStick.service';
import coinDataService from '../../services/coinData.service';

const _mutateResp = (resp, coin) => {
  if(Array.isArray(resp) && resp.length > 1) {
    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    let hmax = -100;
    let hmin = 100;
    const chartD = resp.map((item, index) => {
      if(index < resp.length-1) {
        const ch = (resp[index+1][1] - item[1])/item[1] * 100;
        const row = {
          name: item[0],
          [coin]: item[1],
          return: Number(ch.toFixed(5))
        }
        max = max < item[1] ? item[1] : max;
        min = min > item[1] ? item[1] : min;
        hmax = hmax < row.return ? row.return : hmax;
        hmin = hmin > row.return ? row.return : hmin;
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

export const fetchCandleDataV2 = (coin, days) => {
  return async dispatch => {
    dispatch(CandleV2Reducers.begin_fetch());
    try {
      const resp = await candleStickService().fetchCandleDataV2({coin, days});
      dispatch(CandleV2Reducers.update_success(resp.data));
      return resp.data;
    } catch(e) {
      console.log(e.message);
      dispatch(CandleV2Reducers.update_fail(e.message));
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
      dispatch(LineReducers.update_fail(e.message));
      throw e;
    }
  }
}

export const fetchMarqueeData = (coins) => {
  //just updates line chart data - no stat calculation
  return async dispatch => {
    dispatch(LineReducers.begin_fetch());
    try {
      const resp = await coinDataService().fetchTableData(coin, days, interval);
      dispatch(LineReducers.update_success(resp.data));
      return resp.data;
    } catch(e) {
      console.log(e.message);
      dispatch(LineReducers.update_fail(e.message));
      throw e;
    }
  }
}

export const fetchLineDataAndCalculate_price = (coin, days, interval, timezone) => {
  //mutate line chart data and update stat
  return async dispatch => {
    dispatch(LineReducers.begin_fetch());
    dispatch(LineReducers.begin_price_calculation());
    try {
      const resp = await coinDataService().fetchTableData(coin, days, interval);
      const endDate = Math.floor(Date.now() / 1000);
      const startDate = endDate - (days * 24 * 60 * 60);
      dispatch(LineReducers.update_success(resp.data));
      const mutatedResp = _mutateResp(resp.data['prices'], coin);
      dispatch(LineReducers.update_price_minMax(mutatedResp.minMax));
      dispatch(LineReducers.update_price_chart(mutatedResp.chart));
      const stat = calAvg(mutatedResp.chart, interval, timezone);
      dispatch(LineReducers.update_price_stat(stat));
      dispatch(LineReducers.update_search({
        timezone,
        interval,
        coin,
        endDate,
        startDate,
        volumeOrPrice: "price",
      }));
      return true;
    } catch(e) {
      console.log(e.message);
      dispatch(LineReducers.update_fail(e.message));
      throw e;
    }
  }
}

export const fetchLineDataAndCalculate_volume = (coin, days, interval, timezone) => {
  //mutate line chart data and update stat
  return async dispatch => {
    dispatch(LineReducers.begin_fetch());
    dispatch(LineReducers.begin_volume_calculation());
    try {
      const endDate = Math.floor(Date.now() / 1000);
      const startDate = endDate - (days * 24 * 60 * 60);
      const resp = await coinDataService().fetchTableData(coin, days, interval);
      dispatch(LineReducers.update_success(resp.data));
      const mutatedResp = _mutateResp(resp.data['total_volumes'], coin);
      dispatch(LineReducers.update_volume_minMax(mutatedResp.minMax));
      dispatch(LineReducers.update_volume_chart(mutatedResp.chart));
      const stat = calAvg(mutatedResp, interval);
      dispatch(LineReducers.update_volume_stat(stat));
      dispatch(LineReducers.update_search({
        timezone,
        interval,
        coin,
        endDate,
        startDate,
        volumeOrPrice: "total_volumes",
      }));
      return true;
    } catch(e) {
      console.log(e.message);
      dispatch(LineReducers.update_fail(e.message));
      throw e;
    }
  }
}

