import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    username: localStorage.getItem("chatUsername") || "guest" + Math.floor(Math.random() * 100000),
    messages: [],
    room: "coin",
  },
  reducers: {
    update_chat: (state, action) => {
      state.username = action.payload.username;
      state.room = action.payload.room || "coin";
      localStorage.setItem("chatUsername", state.username);
    },
  },
});

export const { update_chat } = chatSlice.actions;

export default chatSlice.reducer;