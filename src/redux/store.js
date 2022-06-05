import { configureStore } from '@reduxjs/toolkit';
import startDateReducer from './slices/startDate';
import endDateReducer from './slices/endDate';
import coinGeckoRespReducer from './slices/coinGeckoResp';
import tableDataReducer from './slices/tableData';
import chartDataReducer from './slices/chartData';

export default configureStore({
  reducer: {
    startDate: startDateReducer,
    endDate: endDateReducer,
    coinGeckoResp: coinGeckoRespReducer,
    tableData: tableDataReducer,
    chartData: chartDataReducer
  },
})