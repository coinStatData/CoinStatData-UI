import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import startDateReducer from './slices/startDate';
import endDateReducer from './slices/endDate';
import coinGeckoRespReducer from './slices/coinGeckoResp';
import tableDataReducer from './slices/tableData';
import chartDataReducer from './slices/chartData';
import coinReducer from './slices/coin';
import intervalReducer from './slices/interval';

export default configureStore({
  reducer: {
    startDate: startDateReducer,
    endDate: endDateReducer,
    coinGeckoResp: coinGeckoRespReducer,
    tableData: tableDataReducer,
    chartData: chartDataReducer,
    coin: coinReducer,
    interval: intervalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return process.env?.REACT_APP_NODE_ENV === 'development' ? 
      getDefaultMiddleware({serializableCheck: false,}).concat(logger) : getDefaultMiddleware({serializableCheck: false})
  },
  devTools: process.env?.REACT_APP_NODE_ENV === 'development',
})