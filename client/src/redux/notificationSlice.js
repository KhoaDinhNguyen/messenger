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
      console.log(senderId);
      console.log(receiverId);
      console.log(type);
      return state.filter((notification) => {
        return !(
          notification.senderId.id === senderId &&
          notification.receiverId.id === receiverId &&
          notification.type === type
        );
      });
    },
  },
});

export { notificationListSlice };
