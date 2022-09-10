import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import searchReducer from './slices/search';
import coinGeckoRespReducer from './slices/coinGeckoResp';
import tableDataReducer from './slices/tableData';
import chartDataReducer from './slices/chartData';
import chatReducer from './slices/chat';

export default configureStore({
  reducer: {
    search: searchReducer,
    coinGeckoResp: coinGeckoRespReducer,
    tableData: tableDataReducer,
    chartData: chartDataReducer,
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) => {
    return process.env?.REACT_APP_NODE_ENV === 'dev' ? 
      getDefaultMiddleware({serializableCheck: false,}).concat(logger) : getDefaultMiddleware({serializableCheck: false})
  },
  devTools: process.env?.REACT_APP_NODE_ENV === 'dev',
})