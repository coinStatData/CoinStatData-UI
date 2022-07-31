import { createSlice } from '@reduxjs/toolkit'

export const intervalSlice = createSlice({
  // daily or hourly
  name: 'interval',
  initialState: {
    value: "daily",
  },
  reducers: {
    update_interval: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update_interval } = intervalSlice.actions

export default intervalSlice.reducer