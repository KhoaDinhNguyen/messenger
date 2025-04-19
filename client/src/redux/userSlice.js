import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
  name: "name",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const userFriendsSlice = createSlice({
  name: "userFriends",
  initialState: [],
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const userWaitingFriendsSlice = createSlice({
  name: "waitingFriends",
  initialState: [],
  reducers: {
    init(state, action) {
      return action.payload;
    },
    addItem(state, action) {
      return [...state, action.payload];
    },
    removeItem(state, action) {
      return state.filter((friend) => friend.friendId !== action.payload);
    },
  },
});

export { userFriendsSlice, userWaitingFriendsSlice, nameSlice };
