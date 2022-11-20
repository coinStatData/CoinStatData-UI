import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    endDate: "07/07/2027 07:00 PM",
    startDate: "07/07/2000 07:00 PM",
    coin: "bitcoin",
    interval: "daily",
    volumeOrPrice: "prices",
  },
  reducers: {
    update_endDate: (state, action) => {
      state.endDate = action.payload;
    },
    update_startDate: (state, action) => {
      state.startDate = action.payload;
    },
    update_interval: (state, action) => {
      state.interval = action.payload;
    },
    update_coin: (state, action) => {
      state.coin = action.payload;
    },
    update_volPrice: (state, action) => {
      state.volumeOrPrice = action.payload;
    },
    update_timezone: (state, action) => {
      state.timezone = action.payload;
    },
    update_all: (state, action) => {
      state.volumeOrPrice = action.payload.volumeOrPrice || 'prices';
      state.coin = action.payload.coin || 'bitcoin';
      state.interval = action.payload.interval || 'daily';
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.timezone = action.payload.timezone || 'UTC';
    },
  },
})

export const { 
  update_endDate, 
  update_startDate, 
  update_interval, 
  update_coin, 
  update_volPrice, 
  update_all 
} = searchSlice.actions

export default searchSlice.reducer