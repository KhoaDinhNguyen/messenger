import { useEffect } from "react";
import { Manager } from "socket.io-client";
import { useDispatch } from "react-redux";

import { notificationListSlice } from "../../../redux/notificationSlice";
import {
  userFriendsSlice,
  userWaitingFriendsSlice,
} from "../../../redux/userSlice";

function UserSocket({ userid }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Call");
    const manager = new Manager(process.env.REACT_APP_SERVER_API, {
      autoConnect: true,
      query: {
        userid: userid,
      },
    });
    const socket = manager.socket("/");
    socket.connect();
    socket.on("friendRequest", (data) => {
      console.log(data);
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
        console.log(notification);
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
    });
  }, [userid, dispatch]);

  return <></>;
}

export default UserSocket;
