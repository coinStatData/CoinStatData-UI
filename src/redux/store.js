import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import searchReducer from './slices/search';
import lineDataReducer from './slices/lineData';
import tableDataReducer from './slices/tableData';
import candleDataReducer from './slices/candleData';
import chatReducer from './slices/chat';
import trendingCoinsReducer from './slices/trendingCoins';
import coinIndexReducer from './slices/coinIndex';
import CSD60IndexReducer from './slices/CSD60Index';
import CSDGlobalIndexReducer from './slices/CSDGlobalIndex';
import CSDCoinsReducer from './slices/CSDCoins';
import userSettingReducer from './slices/userSettings';
import marqueeReducer from './slices/marquee';
import miniChartReducer from './slices/miniCharts';

export default configureStore({
  reducer: {
    search: searchReducer,
    lineData: lineDataReducer,
    tableData: tableDataReducer,
    candleData: candleDataReducer,
    chat: chatReducer,
    trendingCoins: trendingCoinsReducer,
    coinIndex: coinIndexReducer,
    CSD_60Index: CSD60IndexReducer,
    CSD_GlobalIndex: CSDGlobalIndexReducer,
    CSD_Coins: CSDCoinsReducer,
    userSettings: userSettingReducer,
    marquee: marqueeReducer,
    miniChart: miniChartReducer
  },
  middleware: (getDefaultMiddleware) => {
    return process.env?.REACT_APP_NODE_ENV === 'dev' ? 
      getDefaultMiddleware({serializableCheck: false,}).concat(logger) : getDefaultMiddleware({serializableCheck: false})
  },
  devTools: process.env?.REACT_APP_NODE_ENV === 'dev',
});