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

const dobSlice = createSlice({
  name: "dob",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const genderSlice = createSlice({
  name: "gender",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const pronounceSlice = createSlice({
  name: "pronounce",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const emailSlice = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const phoneSlice = createSlice({
  name: "phone",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const profileImageFileNameSlice = createSlice({
  name: "profileImageFileName",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const profileImageFileURLSlice = createSlice({
  name: "profileImageFileURL",
  initialState: "",
  reducers: {
    init(state, action) {
      return action.payload;
    },
  },
});

const profileUrlSlice = createSlice({
  name: "profileUrl",
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
    addItem(state, action) {
      return [...state, action.payload];
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

export {
  userFriendsSlice,
  userWaitingFriendsSlice,
  nameSlice,
  dobSlice,
  genderSlice,
  pronounceSlice,
  emailSlice,
  phoneSlice,
  profileImageFileNameSlice,
  profileImageFileURLSlice,
  profileUrlSlice,
};
