import { createSlice } from '@reduxjs/toolkit'

export const chartDataSlice = createSlice({
  // chart data to be fed to the graphs
  name: 'chartData',
  initialState: {
    simpleChart: [],
    candleChart: [],
  },
  reducers: {
    update_simpleData: (state, action) => {
      state.simpleChart = action.payload
    },
    update_candleData: (state, action) => {
      state.candleChart = action.payload
    },
  },
})

export const { update_simpleData, update_candleData } = chartDataSlice.actions

export default chartDataSlice.reducer