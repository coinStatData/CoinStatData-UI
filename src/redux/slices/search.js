import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    endDate: "07/07/2027 07:00 PM",
    startDate: "07/07/2000 07:00 PM",
    coin: "bitcoin",
    interval: "daily"
  },
  reducers: {
    update_endDate: (state, action) => {
      state.endDate = action.payload
    },
    update_startDate: (state, action) => {
      state.startDate = action.payload
    },
    update_interval: (state, action) => {
      state.interval = action.payload
    },
    update_coin: (state, action) => {
      state.coin = action.payload
    },
  },
})

export const { update_endDate, update_startDate, update_interval, update_coin } = searchSlice.actions

export default searchSlice.reducer