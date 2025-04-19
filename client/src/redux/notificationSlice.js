import { createSlice } from "@reduxjs/toolkit";

const notificationListSlice = createSlice({
  name: "notificationList",
  initialState: [],
  reducers: {
    init(state, action) {
      return action.payload;
    },
    addNotification(state, action) {
      return [...state, action.payload];
    },
  },
});

export { notificationListSlice };
