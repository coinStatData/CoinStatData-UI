import { createSlice } from '@reduxjs/toolkit'

export const miniChartSlice = createSlice({
  // chart data to be fed to the graphs
  name: 'miniChart',
  initialState: {
    resp: {
      isError: false,
      isLoading: false,
      data: [],
      error: {},
    }
  },
  reducers: {

// ---------------- candle data ----------------

    begin_fetch: (state, action) => {
      state.resp.isLoading = true;
      state.resp.isError = false;
      state.resp.error = null;
      state.resp.data = [];
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
      state.resp.data = [];
    },
  },
})

export const { begin_fetch, update_success, update_fail } = miniChartSlice.actions

export default miniChartSlice.reducer