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
      const { senderId, receiverId, type } = action.payload;

      return state.filter((notification) => {
        return !(
          notification.senderId === senderId &&
          notification.receiverId === receiverId &&
          notification.type === type
        );
      });
    },
  },
});

export { notificationListSlice };
