import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import searchReducer from './slices/search';
import lineDataReducer from './slices/lineData';
import tableDataReducer from './slices/tableData';
import candleDataReducer from './slices/candleData';
import chatReducer from './slices/chat';
import trendingCoinsReducer from './slices/trendingCoins';
import coinIndexReducer from './slices/coinIndex'

export default configureStore({
  reducer: {
    search: searchReducer,
    lineData: lineDataReducer,
    tableData: tableDataReducer,
    candleData: candleDataReducer,
    chat: chatReducer,
    trendingCoins: trendingCoinsReducer,
    coinIndex: coinIndexReducer
  },
  middleware: (getDefaultMiddleware) => {
    return process.env?.REACT_APP_NODE_ENV === 'dev' ? 
      getDefaultMiddleware({serializableCheck: false,}).concat(logger) : getDefaultMiddleware({serializableCheck: false})
  },
  devTools: process.env?.REACT_APP_NODE_ENV === 'dev',
})