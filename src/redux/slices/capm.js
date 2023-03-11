import { createSlice } from '@reduxjs/toolkit'

export const capmSlice = createSlice({
  name: 'capm',
  initialState: {
    result: []
  },
  reducers: {
    update_capm: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { update_capm } = capmSlice.actions;

export default capmSlice.reducer;