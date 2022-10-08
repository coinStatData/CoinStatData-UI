import { createSlice } from '@reduxjs/toolkit'

export const candleDataSlice = createSlice({
  // chart data to be fed to the graphs
  name: 'candletData',
  initialState: {
    resp: {
      isError: false,
      isLoading: false,
      data: [{open: 0, close:0}],
      error: {},
    }
  },
  reducers: {

// ---------------- candle data ----------------

    begin_fetch: (state, action) => {
      state.resp.isLoading = true;
      state.resp.isError = false;
      state.resp.error = null;
      state.resp.data = [{open: 0, close:0}];
    },
    update_success: (state, action) => {
      state.resp.isLoading = false;
      state.resp.isError = false;
      state.resp.error = null;
      state.resp.data = action.payload;
    },
    update_fail: (state, action) => {
      state.resp.isLoading = false;
      state.resp.isError = true;
      state.resp.error = action.payload;
      state.resp.data = [{open: 0, close:0}];
    },
  },
})

export const { begin_fetch, update_success, update_fail } = candleDataSlice.actions

export default candleDataSlice.reducer