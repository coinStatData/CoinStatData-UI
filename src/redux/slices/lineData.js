import { createSlice } from '@reduxjs/toolkit'

const defaultStat = {
  avgReturn: {},
  avgSumData: [],
  avgSumMData: [],
  avgMReturn: {},
}

const defaultMinMax = {
  min: 0,
  max: 0,
  hMinReturn: 0,
  hMaxReturn: 0,
}

export const lineDataSlice = createSlice({
  
  name: 'lineData',
  initialState: {
    resp: {
      data: [[0,0]],
      isLoading: false,
      isError: false,
      error: {},
    },
    search: {
      endDate: "07/07/2027 07:00 PM",
      startDate: "07/07/2000 07:00 PM",
      coin: "bitcoin",
      interval: "daily",
      volumeOrPrice: "prices", //or total_volumes
    },
    price: {
      chart: {
        data: [],
      },
      stat: defaultStat,
      minMax: defaultMinMax,
      isCalculating: false,
      isError: false
    },
    volume: {
      chart: {
        data: [],
      },
      stat: defaultStat,
      minMax: defaultMinMax,
      isCalculating: false,
      isError: false
    }
  },
  reducers: {

    //--------------- resp ------------------//
    begin_fetch: (state, action) => {
      state.resp.isLoading = true;
      state.resp.isError = false;
      state.resp.error = null;
      state.resp.data = [[0,0]];
    },
    update_success: (state, action) => {
      state.resp.isLoading = false;
      state.resp.isError = false;
      state.resp.error = null;
      state.resp.data = action.payload;
    },
    update_fail: (state, action) => {
      state.resp.isLoading = false;
      state.resp.isError = true;
      state.resp.error = action.payload;
      state.resp.data = [[0,0]];
    },

    //---------------- price -----------------//
    begin_price_calculation: (state, action) => {
      state.price.isCalculating = true;
      state.price.stat = defaultStat;
      state.price.minMax = defaultMinMax;
    },
    update_price_chart: (state, action) => {
      state.price.chart.data = action.payload;
    },
    update_price_minMax: (state, action) => {
      state.price.minMax.min = action.payload.min;
      state.price.minMax.max = action.payload.max;
      state.price.minMax.hMinReturn = action.payload.hMinReturn;
      state.price.minMax.hMaxReturn = action.payload.hMaxReturn;
    },
    update_price_stat: (state, action) => {
      state.price.stat.avgReturn = action.payload.avgReturn;
      state.price.stat.avgSumData = action.payload.avgSumData;
      state.price.stat.avgSumMData = action.payload.avgSumMData;
      state.price.stat.avgMReturn = action.payload.avgMReturn;
      state.price.isCalculating = false;
      state.price.isError = false;
    },

    //---------------- volumn -----------------//
    begin_volume_calculation: (state, action) => {
      state.volume.isCalculating = true;
      state.volume.stat = defaultStat;
      state.volume.minMax = defaultMinMax;
    },
    update_volume_chart: (state, action) => {
      state.volume.chart.data = action.payload;
    },
    update_volume_minMax: (state, action) => {
      state.volume.minMax.min = action.payload.min;
      state.volume.minMax.max = action.payload.max;
      state.volume.minMax.hMinReturn = action.payload.hMinReturn;
      state.volume.minMax.hMaxReturn = action.payload.hMaxReturn;
    },
    update_volume_stat: (state, action) => {
      state.volume.stat.avgReturn = action.payload.avgReturn;
      state.volume.stat.avgSumData = action.payload.avgSumData;
      state.volume.stat.avgSumMData = action.payload.avgSumMData;
      state.volume.stat.avgMReturn = action.payload.avgMReturn;
      state.volume.isCalculating = false;
      state.price.isError = false;
    },

  },
})

export const { begin_volume_calculation, begin_price_calculation, 
  update_volume_stat, update_volume_minMax, update_volume_chart, 
  update_price_chart, begin_fetch, update_success, update_fail, 
  update_price_stat, update_price_minMax 
} = lineDataSlice.actions;

export default lineDataSlice.reducer