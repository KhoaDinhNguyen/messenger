import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  userFriendsSlice,
  userWaitingFriendsSlice,
  nameSlice,
  dobSlice,
  genderSlice,
  pronounceSlice,
  emailSlice,
  phoneSlice,
  profileImageFileURLSlice,
  profileImageFileNameSlice,
  profileUrlSlice,
} from "./userSlice";
import { notificationListSlice } from "./notificationSlice";

import {
  currentMessageSlice,
  currentSenderSlice,
  latestMessageSlice,
} from "./messageSlice";

import { postsSlice } from "./postSlice";

import { commentSlice } from "./commentSlice";

const reducers = {
  [nameSlice.name]: nameSlice.reducer,
  [dobSlice.name]: dobSlice.reducer,
  [genderSlice.name]: genderSlice.reducer,
  [pronounceSlice.name]: pronounceSlice.reducer,
  [emailSlice.name]: emailSlice.reducer,
  [phoneSlice.name]: phoneSlice.reducer,
  [profileUrlSlice.name]: profileUrlSlice.reducer,
  [profileImageFileURLSlice.name]: profileImageFileURLSlice.reducer,
  [profileImageFileNameSlice.name]: profileImageFileNameSlice.reducer,

  [userFriendsSlice.name]: userFriendsSlice.reducer,
  [userWaitingFriendsSlice.name]: userWaitingFriendsSlice.reducer,

  [notificationListSlice.name]: notificationListSlice.reducer,

  [currentMessageSlice.name]: currentMessageSlice.reducer,
  [latestMessageSlice.name]: latestMessageSlice.reducer,
  [currentSenderSlice.name]: currentSenderSlice.reducer,

  [postsSlice.name]: postsSlice.reducer,
  [commentSlice.name]: commentSlice.reducer,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
