import { createSlice } from '@reduxjs/toolkit'

/* 
  INFO:
  - This is CSD's good quality data, collected from 11/12/2022
  - incudes CSD 60
  - interval = hourly / daily
*/

const defaultSearch = {
  start: 1668376840,
  end: Math.floor(Date.now()),
  interval: "hourly"
}

const defaultMetaData = {
  start: 1668376840,
  end: Math.floor(Date.now()),
  interval: "hourly"
}

export const CSD_GlobalIndexSlice = createSlice({
  name: 'CSD_GlobalIndex',
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    
    search: defaultSearch,
    metaData: defaultMetaData,
    error: {},
  },
  reducers: {

  // ---------------- CSD global index data ----------------

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

// 
export const { begin_fetch, update_success, update_fail } = CSD_GlobalIndexSlice.actions

export default CSD_GlobalIndexSlice.reducer