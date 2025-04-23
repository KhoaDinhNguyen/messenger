import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";

import Socket from "../../../pages/User/socket";

import { notificationListSlice } from "../../../redux/notificationSlice";
import {
  userFriendsSlice,
  userWaitingFriendsSlice,
} from "../../../redux/userSlice";

import { currentMessageSlice } from "../../../redux/messageSlice";

function UserSocket({ userid }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
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
        console.log(notification);
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

      if (action === "create") {
        const friendId = searchParams.get("friendId");
        if (
          message.senderId === friendId &&
          message.senderId !== message.receiverId
        ) {
          dispatch(currentMessageSlice.actions.addMessage(message));
        }
      }
    }

    if (Socket.getSocket() !== undefined) {
      //console.log("CALL");
      Socket.getSocket().on("friendRequest", friendRequestHandler);
      Socket.getSocket().on("message", messageHandler);
    }

    return () => {
      Socket.getSocket().off("friendRequest", friendRequestHandler);
      Socket.getSocket().off("message", messageHandler);
    };
  }, [userid, dispatch, searchParams]);

  return <></>;
}

export default UserSocket;
