import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    init(state, action) {
      return [...state, ...action.payload];
    },
    createComment(state, action) {
      return [action.payload, ...state];
    },
    cleanComments(state, action) {
      return [];
    },
    updateCommentFromCreatedComment(state, action) {
      const { parentId, childId } = action.payload;

      const newState = state.forEach((comment) => {
        console.log(comment);
        if (comment.id !== parentId) {
          return comment;
        }

        comment.comments = [childId, ...comment.comments];
      });

      return newState;
    },
  },
});

export { commentSlice };
