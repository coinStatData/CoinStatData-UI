import { createSlice } from '@reduxjs/toolkit'

export const chartDataSlice = createSlice({
  // chart data to be fed to the graphs
  name: 'chartData',
  initialState: {
    line: {
      isError: false,
      isLoading: true,
      data: [],
      error: {}
    },
    candle: {
      isError: false,
      isLoading: true,
      data: [{open: 0, close:0}],
      error: {},
    }
  },
  reducers: {
    begin_line_fetch: (state, action) => {
      state.line.isLoading = true;
      state.line.isError = false;
      state.line.error = null;
      state.line.data = action.payload;
    },
    update_lineData_success: (state, action) => {
      state.line.isLoading = false;
      state.line.isError = false;
      state.line.error = null;
      state.line.data = action.payload;
    },
    update_lineData_fail: (state, action) => {
      state.line.isLoading = false;
      state.line.isError = true;
      state.line.error = action.payload;
      state.line.data = [];
    },

// ---------------- candle data ----------------

    begin_candle_fetch: (state, action) => {
      state.candle.isLoading = true;
      state.candle.isError = false;
      state.candle.error = null;
      state.candle.data = action.payload;
    },
    update_candleData_success: (state, action) => {
      state.candle.isLoading = false;
      state.candle.isError = false;
      state.candle.error = null;
      state.candle.data = action.payload;
    },
    update_candleData_fail: (state, action) => {
      state.candle.isLoading = false;
      state.candle.isError = true;
      state.candle.error = action.payload;
      state.candle.data = [{open: 0, close:0}];
    },
  },
})

export const { begin_line_fetch, update_lineData_fail, begin_candle_fetch, update_lineData_success,update_candleData_fail, update_candleData_success } = chartDataSlice.actions

export default chartDataSlice.reducer