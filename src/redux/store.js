import { configureStore } from '@reduxjs/toolkit';
import startDateReducer from './slices/startDate';
import endDateReducer from './slices/endDate';

export default configureStore({
  reducer: {
      startDate: startDateReducer,
      endDate: endDateReducer,
  },
})