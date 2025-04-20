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
    removeNotification(state, action) {
      return state.filter((notification) => {
        console.log(action.payload);
        console.log(notification.senderId.id !== action.payload);
        return notification.senderId.id !== action.payload;
      });
    },
  },
});

export { notificationListSlice };
