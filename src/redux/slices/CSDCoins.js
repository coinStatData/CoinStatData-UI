import { createSlice } from '@reduxjs/toolkit'

/* 
  INFO:
  - This is CSD's poor quality data, collected from august 2022
  - incudes CSD 60
  - interval = hourly only
*/

const defaultSearch = {
  start: 1668376840,
  end: Math.floor(Date.now() / 1000),
  interval: "hourly",
  coin: "bitcoin"
}

const defaultMetaData = {
  start: 1668376840,
  end: Math.floor(Date.now() / 1000),
  interval: "hourly",
  coin: "bitcoin"
}

export const CSD_CoinsSlice = createSlice({
  name: 'CSD_Coins',
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    returnData: [],
    search: defaultSearch,
    metaData: defaultMetaData,
    error: {},
  },
  reducers: {

// ---------------- CSD 60 index data ----------------

    begin_fetch: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.data = [];
      state.returnData = [];
      state.metaData = defaultMetaData;
      state.search = action.payload;
    },
    update_success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.data = action.payload.data;
      state.returnData = action.payload.returnData;
      state.metaData = action.payload.metaData;
    },
    update_fail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.data = [];
      state.returnData = [];
      state.search = defaultSearch;
      state.metaData = defaultMetaData;
    },
  },
});

export const { begin_fetch, update_success, update_fail } = CSD_CoinsSlice.actions

export default CSD_CoinsSlice.reducer