import { createSlice } from '@reduxjs/toolkit'

export const candleDataV2Slice = createSlice({
  // chart data to be fed to the graphs
  name: 'candletDataV2',
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
      state.resp.data = [[]];
    },
  },
})

export const { begin_fetch, update_success, update_fail } = candleDataV2Slice.actions

export default candleDataV2Slice.reducer