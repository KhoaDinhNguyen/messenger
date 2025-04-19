import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  userFriendsSlice,
  userWaitingFriendsSlice,
  nameSlice,
} from "./userSlice";
import { notificationListSlice } from "./notificationSlice";

const reducers = {
  [nameSlice.name]: nameSlice.reducer,
  [userFriendsSlice.name]: userFriendsSlice.reducer,
  [userWaitingFriendsSlice.name]: userWaitingFriendsSlice.reducer,

  [notificationListSlice.name]: notificationListSlice.reducer,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
