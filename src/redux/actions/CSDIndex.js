import * as CSD60Reducers from '../slices/CSD60Index';
import * as CSDGlobalReducers from '../slices/CSDGlobalIndex';
import * as CSDCoinsReducers from '../slices/CSDCoins';
import CSDIndexService from '../../services/CSDIndex.service';

export const fetchCSD60Index = ({ coin, interval, start, end }) => {
  return async dispatch => {
    dispatch(CSD60Reducers.begin_fetch({ coin, interval, start, end }));
    try {
      const resp = await CSDIndexService().fetchCSDIndex({ coin, interval, start, end });
      const { data, actualEnd, actualStart } = _mutateResp(resp.data);
      const payload = { data, metaData: { end: actualEnd, start: actualStart, interval, coin } };
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
      const { data, actualEnd, actualStart } = _mutateResp(resp);
      const payload = { data, metaData: { end: actualEnd, start: actualStart, interval } };
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
      const { data, actualEnd, actualStart } = _mutateResp(resp.data);
      const payload = { data, metaData: { end: actualEnd, start: actualStart, interval, coin } };
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
  const actualEnd = data[0].datetime;
  const actualStart = data[data.length - 1].datetime;
  return { data, actualStart, actualEnd };
}