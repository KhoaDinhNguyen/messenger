import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

export { postsSlice };
