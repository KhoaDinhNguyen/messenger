import { createSlice } from "@reduxjs/toolkit";

const currentMessageSlice = createSlice({
  name: "currentMessage",
  initialState: [],
  reducers: {
    init(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      return [action.payload, ...state];
    },
  },
});

export { currentMessageSlice };
