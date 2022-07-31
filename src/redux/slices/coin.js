import { createSlice } from '@reduxjs/toolkit'

export const coinSlice = createSlice({
  // coin name
  name: 'coin',
  initialState: {
    value: "bitcoin",
  },
  reducers: {
    update_coin: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update_coin } = coinSlice.actions

export default coinSlice.reducer