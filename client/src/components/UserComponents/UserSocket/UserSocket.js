import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";

import Socket from "../../../pages/User/socket";

import { notificationListSlice } from "../../../redux/notificationSlice";
import {
  userFriendsSlice,
  userWaitingFriendsSlice,
} from "../../../redux/userSlice";

import {
  currentMessageSlice,
  latestMessageSlice,
} from "../../../redux/messageSlice";

import { postsSlice } from "../../../redux/postSlice";

import { commentSlice } from "../../../redux/commentSlice";

function UserSocket({ userid }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (Socket.getSocket() === undefined) {
      Socket.init();
    }
    function friendRequestHandler(data) {
      const { action, notification } = data;
      if (action === "create") {
        const { senderId, senderName } = notification;

        dispatch(notificationListSlice.actions.addNotification(notification));
        dispatch(
          userWaitingFriendsSlice.actions.addItem({
            friendId: senderId,
            friendName: senderName,
            type: "sender",
          })
        );
      } else if (action === "remove") {
        const { senderId } = notification;
        dispatch(
          notificationListSlice.actions.removeNotification({
            senderId: senderId,
            receiverId: userid,
            type: "friendRequest",
          })
        );
        dispatch(userWaitingFriendsSlice.actions.removeItem(senderId));
      } else if (action === "decline") {
        dispatch(notificationListSlice.actions.addNotification(notification));
        dispatch(
          userWaitingFriendsSlice.actions.removeItem(notification.senderId)
        );
      } else if (action === "accept") {
        const { senderId } = notification;
        dispatch(notificationListSlice.actions.addNotification(notification));
        dispatch(
          userWaitingFriendsSlice.actions.removeItem(notification.senderId)
        );
        dispatch(
          userFriendsSlice.actions.addItem({
            friendId: notification.senderId,
            friendName: notification.senderName,
          })
        );
        dispatch(
          notificationListSlice.actions.removeNotification({
            senderId: senderId,
            receiverId: userid,
            type: "declineFriendRequest",
          })
        );
      }
    }

    function messageHandler(data) {
      const { action, message } = data;

      try {
        if (action === "create") {
          const formatedMessage = message;
          formatedMessage.createdAt = new Date(message.createdAt)
            .getTime()
            .toString();
          formatedMessage.updatedAt = formatedMessage.createdAt;
          const friendId = searchParams.get("friendId");
          dispatch(latestMessageSlice.actions.addMessage(formatedMessage));
          if (
            message.senderId === friendId &&
            message.senderId !== message.receiverId
          ) {
            dispatch(currentMessageSlice.actions.addMessage(formatedMessage));
            dispatch(
              latestMessageSlice.actions.updateHaveSeenMessage(formatedMessage)
            );
          }
        } else if (action === "updateEmoji") {
          dispatch(
            currentMessageSlice.actions.updateEmoji({
              messageId: message._id,
              emoji: data.emoji,
              commentId: data.commentId,
            })
          );
        } else if (action === "delete") {
          const friendId = searchParams.get("friendId");

          if (
            message.senderId === friendId &&
            message.senderId !== message.receiverId
          ) {
            dispatch(
              currentMessageSlice.actions.deleteMessage({
                messageId: message.messageId,
              })
            );
            dispatch(
              latestMessageSlice.actions.deleteMessage({
                messageId: message.messageId,
              })
            );
          }
        } else if (action === "updateContent") {
          const friendId = searchParams.get("friendId");
          console.log(message);
          if (
            message.senderId === friendId &&
            message.senderId !== message.receiverId
          ) {
            dispatch(
              currentMessageSlice.actions.updateContent({
                messageId: message._id,
                text: message.text,
                replyOf: message.replyOf,
                updatedAt: new Date(message.updatedAt),
                images: message.images,
              })
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    function commentHandler(data) {
      const { comment, action } = data;

      try {
        if (action === "createdFromPost") {
          const { postId } = data;
          const formatedComment = comment;
          formatedComment.createdAt = new Date(formatedComment.createdAt)
            .getTime()
            .toString();
          formatedComment.id = comment._id;
          if (userid !== formatedComment.creatorId) {
            dispatch(commentSlice.actions.createComment(formatedComment));
            dispatch(
              postsSlice.actions.updatePostFromCreatedComment({
                postId: postId,
                commentId: formatedComment._id,
              })
            );
          }
        }
        if (action === "createdFromComment") {
          const { parentId } = data;
          const formatedComment = comment;
          formatedComment.createdAt = new Date(formatedComment.createdAt)
            .getTime()
            .toString();
          formatedComment.id = comment._id;
          dispatch(commentSlice.actions.createComment(formatedComment));
          dispatch(
            commentSlice.actions.updateCommentFromCreatedComment({
              parentId: parentId,
              childId: formatedComment.id,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (Socket.getSocket() !== undefined) {
      Socket.getSocket().on("friendRequest", friendRequestHandler);
      Socket.getSocket().on("message", messageHandler);
      Socket.getSocket().on("comment", commentHandler);
    }

    return () => {
      Socket.getSocket().off("friendRequest", friendRequestHandler);
      Socket.getSocket().off("message", messageHandler);
      Socket.getSocket().off("comment", commentHandler);
    };
  }, [userid, dispatch, searchParams]);

  return <></>;
}

export default UserSocket;
