import { createSlice } from '@reduxjs/toolkit'

export const coinIndexSlice = createSlice({
  // home page coin index data
  name: 'coinIndex',
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    stableData: [],
    error: {},
  },
  reducers: {

// ---------------- home coins index data ----------------

    begin_fetch: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.data = [];
      state.stableData = [];
    },
    update_success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.data = action.payload.csd50;
      state.stableData = action.payload.stable10;
    },
    update_fail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.data = [];
      state.stableData = [];
    },
  },
})

export const { begin_fetch, update_success, update_fail } = coinIndexSlice.actions

export default coinIndexSlice.reducer