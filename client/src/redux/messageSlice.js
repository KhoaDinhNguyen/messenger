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

const latestMessageSlice = createSlice({
  name: "lastMessage",
  initialState: [],
  reducers: {
    init(state, action) {
      return action.payload.filter((message) => message !== null);
    },
    addMessage(state, action) {
      const newState = state.filter((message) => {
        if (
          (message.senderId === action.payload.senderId &&
            message.receiverId === action.payload.receiverId) ||
          (message.senderId === action.payload.receiverId &&
            message.receiverId === action.payload.senderId)
        ) {
          return false;
        }

        return true;
      });
      return [action.payload, ...newState];
    },
    updateHaveSeenMessage(state, action) {
      return state.forEach((message) => {
        if (message.senderId === action.payload.senderId) {
          message.haveSeen = true;
        }
      });
    },
  },
});
export { currentMessageSlice, latestMessageSlice };
