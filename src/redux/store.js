import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import startDateReducer from './slices/startDate';
import endDateReducer from './slices/endDate';
import coinGeckoRespReducer from './slices/coinGeckoResp';
import tableDataReducer from './slices/tableData';
import chartDataReducer from './slices/chartData';
import coinReducer from './slices/coin';
import intervalReducer from './slices/interval';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export default configureStore({
  reducer: {
    startDate: startDateReducer,
    endDate: endDateReducer,
    coinGeckoResp: coinGeckoRespReducer,
    tableData: tableDataReducer,
    chartData: chartDataReducer,
    coin: coinReducer,
    interval: intervalReducer
  },
  middleware: customizedMiddleware
})