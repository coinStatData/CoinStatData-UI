import { createSlice } from '@reduxjs/toolkit'

export const coinGeckoRespSlice = createSlice({
  // response data from coinGecko api
  name: 'coinGeckoResp',
  initialState: {
    value: [[0,0]],
    isFetching: true,
  },
  reducers: {
    
    update_gecko_resp: (state, action) => {
      state.isFetching = false;
      state.value = action.payload
    },
    update_gecko_isFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
})

export const { update_gecko_resp } = coinGeckoRespSlice.actions

export default coinGeckoRespSlice.reducer