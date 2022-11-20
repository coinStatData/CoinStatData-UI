import { createSlice } from '@reduxjs/toolkit'

export const marqueeSlice = createSlice({
  // marquee data
  name: 'marquee',
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    error: {},
  },
  reducers: {

// ---------------- marquee data ----------------

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
});

export const { 
  begin_fetch, 
  update_success, 
  update_fail 
} = marqueeSlice.actions

export default marqueeSlice.reducer