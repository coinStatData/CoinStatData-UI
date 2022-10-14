import { createSlice } from '@reduxjs/toolkit'

export const trendingCoinsSlice = createSlice({
  // trending coins to be displayed on the home page
  name: 'trendingCoins',
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    error: {},
  },
  reducers: {

// ---------------- trending coins data ----------------

    begin_fetch: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.data = [];
    },
    update_success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.data = action.payload;
    },
    update_fail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.data = [];
    },
  },
})

export const { begin_fetch, update_success, update_fail } = trendingCoinsSlice.actions

export default trendingCoinsSlice.reducer