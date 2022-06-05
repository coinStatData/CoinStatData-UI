import { createSlice } from '@reduxjs/toolkit'

export const coinGeckoRespSlice = createSlice({
  // response data from coinGecko api
  name: 'coinGeckoResp',
  initialState: {
    value: [],
  },
  reducers: {
    update_gecko_resp: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update_gecko_resp } = coinGeckoRespSlice.actions

export default coinGeckoRespSlice.reducer