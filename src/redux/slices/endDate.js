import { createSlice } from '@reduxjs/toolkit'

export const eDateSlice = createSlice({
  name: 'endDate',
  initialState: {
    value: "07/07/2027 07:00 PM",
  },
  reducers: {
    update_endDate: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update_endDate } = eDateSlice.actions

export default eDateSlice.reducer