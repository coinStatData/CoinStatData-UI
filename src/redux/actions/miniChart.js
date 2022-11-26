import * as miniChartReducer from '../slices/miniCharts';
import miniChartService from '../../services/miniChart.service';

export const fetchMiniCharts = (coins) => {
  return async dispatch => {
    dispatch(miniChartReducer.begin_fetch());
    try {
      const resp = await miniChartService().fetchCharts(coins);
      const mutatedResp = _mutateResp(resp);
      dispatch(miniChartReducer.update_success(mutatedResp));
      return mutatedResp;
    } catch(e) {
      console.error(e.message);
      dispatch(miniChartReducer.update_fail(e.message));
      return false;
    }
  }
}

const _mutateResp = (resp) => {
  //throw new Error('Invalid response');
  return resp.data;
} 