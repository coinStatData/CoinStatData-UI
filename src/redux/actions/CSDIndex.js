import * as CSD60Reducers from '../slices/CSD60Index';
import * as CSDGlobalReducers from '../slices/CSDGlobalIndex';
import * as CSDCoinsReducers from '../slices/CSDCoins';
import CSDIndexService from '../../services/CSDIndex.service';

export const fetchCSD60Index = ({ coin, interval, start, end }) => {
  return async dispatch => {
    dispatch(CSD60Reducers.begin_fetch({ coin, interval, start, end }));
    try {
      const resp = await CSDIndexService().fetchCSDIndex({ coin, interval, start, end });
      const { data, returnData, actualEnd, actualStart } = _mutateResp(resp);
      const payload = { data, returnData, metaData: { end: actualEnd, start: actualStart, interval, coin } };
      dispatch(CSD60Reducers.update_success(payload));
      return payload;
    } catch(e) {
      console.error(e.message);
      dispatch(CSD60Reducers.update_fail(e.message));
      return false;
    }
  }
}

export const fetchCSDGlobalIndex = ({ interval, start, end }) => {
  return async dispatch => {
    dispatch(CSDGlobalReducers.begin_fetch({ interval, start, end }));
    try {
      const resp = await CSDIndexService().fetchGlobal({ interval, start, end });
      const { data, returnData, actualEnd, actualStart } = _mutateResp(resp);
      const payload = { data, returnData, metaData: { end: actualEnd, start: actualStart, interval } };
      dispatch(CSDGlobalReducers.update_success(payload));
      return payload;
    } catch(e) {
      console.error(e.message);
      dispatch(CSDGlobalReducers.update_fail(e.message));
      return false;
    }
  }
}

export const fetchCSDCoins = ({ coin, interval, start, end }) => {
  return async dispatch => {
    dispatch(CSDCoinsReducers.begin_fetch({ coin, interval, start, end }));
    try {
      const resp = await CSDIndexService().fetchCoin({ coin, interval, start, end });
      const { data, returnData, actualEnd, actualStart } = _mutateResp(resp);
      const payload = { data, returnData, metaData: { end: actualEnd, start: actualStart, interval, coin } };
      dispatch(CSDCoinsReducers.update_success(payload));
      return payload;
    } catch(e) {
      console.error(e.message);
      dispatch(CSDCoinsReducers.update_fail(e.message));
      return false;
    }
  }
}

const _mutateResp = (resp) => {
  let data = resp.data;
  data.sort((a,b) => b.datetime - a.datetime);
  const returnData = data[0]?.coin ? _calculateReturnCoin(data) : _calculateReturnGlobal(data);
  const actualEnd = data[0].datetime;
  const actualStart = data[data.length - 2].datetime;
  return { data, returnData, actualStart, actualEnd };
}

const _calculateReturnGlobal = (data) => {
  const returnData = [];
  for (let i = 0; i < data.length-1; i++) {
    const entry = {
      datetime: data[i].datetime,
      change: Number((data[i].none_stable_mc - data[i+1].none_stable_mc) / data[i+1].none_stable_mc * 100).toFixed(4)
    }
    returnData.push(entry);
  }
  return returnData;
}

const _calculateReturnCoin = (data) => {
  const returnData = [];
  for (let i = 0; i < data.length-1; i++) {
    const entry = {
      datetime: data[i].datetime,
      change: Number((data[i].price - data[i+1].price) / data[i+1].price * 100).toFixed(4)
    }
    returnData.push(entry);
  }
  return returnData;
}