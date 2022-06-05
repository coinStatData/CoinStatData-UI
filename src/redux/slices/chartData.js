import { createSlice } from '@reduxjs/toolkit'

export const chartDataSlice = createSlice({
  // chart data to be fed to the graphs
  name: 'chartData',
  initialState: {
    value: [],
  },
  reducers: {
    update_chartData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update_chartData } = chartDataSlice.actions

export default chartDataSlice.reducer