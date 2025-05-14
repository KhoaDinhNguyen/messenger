import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    init(state, action) {
      return action.payload;
    },
    createPost(state, action) {
      console.log(action.payload);
      return [action.payload, ...state];
    },
    updatePostFromCreatedComment(state, action) {
      const { postId, commentId } = action.payload;

      const newState = state.forEach((post) => {
        if (postId !== post._id) {
          return post;
        }

        post.comments = [commentId, ...post.comments];
      });

      return newState;
    },
  },
});

export { postsSlice };
