import { createSlice } from '@reduxjs/toolkit'

export const tableDataSlice = createSlice({
  name: 'tableData',
  initialState: {
    value: [],
  },
  reducers: {
    update_tableData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update_tableData } = tableDataSlice.actions

export default tableDataSlice.reducer