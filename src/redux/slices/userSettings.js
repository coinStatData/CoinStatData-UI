import { createSlice } from '@reduxjs/toolkit'

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: {
    timezone: localStorage.getItem('timezone') || 'UTC',
    timeFormat: localStorage.getItem('timeFormat') || 'default',
    numberFormat: localStorage.getItem('numberFormat') || 'short-format',
  },
  reducers: {
    update_timezone: (state, action) => {
      state.timezone = action.payload;
      localStorage.setItem('timezone', state.timezone);
    },
    update_timeFormat: (state, action) => {
      state.timeFormat = action.payload;
      localStorage.setItem('timeFormat', state.timeFormat);
    },
    update_numberFormat: (state, action) => {
      state.numberFormat = action.payload
      localStorage.setItem('numberFormat', state.numberFormat);
    },
  },
})

export const { update_timezone, update_timeFormat, update_numberFormat } = userSettingsSlice.actions

export default userSettingsSlice.reducer