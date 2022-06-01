import { createSlice } from '@reduxjs/toolkit'

export const sDateSlice = createSlice({
  name: 'startDate',
  initialState: {
    value: "07/07/2007 07:00 AM",
  },
  reducers: {
    update_startDate: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_startDate } = sDateSlice.actions

export default sDateSlice.reducer