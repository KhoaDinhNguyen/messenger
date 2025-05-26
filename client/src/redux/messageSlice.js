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
    updateEmoji(state, action) {
      const { messageId, emoji, commentId } = action.payload;

      state.forEach((message) => {
        if (message._id === messageId) {
          if (message.senderId === commentId) {
            if (message.senderEmoji === emoji) {
              message.senderEmoji = "";
            } else {
              message.senderEmoji = emoji;
            }
          } else {
            if (message.receiverEmoji === emoji) {
              message.receiverEmoji = "";
            } else {
              message.receiverEmoji = emoji;
            }
          }
        }

        return message;
      });

      return state;
    },
    deleteMessage(state, action) {
      const { messageId } = action.payload;
      return [
        ...state.filter((message) => {
          return message._id !== messageId;
        }),
      ];
    },
    updateContent(state, action) {
      const { messageId, text, images, replyOf, updatedAt } = action.payload;

      state.forEach((message) => {
        if (message._id === messageId) {
          message.text = text;
          message.images = images;
          message.replyOf = replyOf;
          message.updatedAt = updatedAt;
        }

        return message;
      });

      return state;
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
    deleteMessage(state, action) {
      const { messageId } = action.payload;
      return state.forEach((message) => {
        if (message._id === messageId) {
          message.getDeleted = true;
        }
      });
    },
  },
});

const currentSenderSlice = createSlice({
  name: "currentSender",
  initialState: null,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export { currentMessageSlice, latestMessageSlice, currentSenderSlice };
