import { useEffect } from "react";
import { Manager } from "socket.io-client";
import { useDispatch } from "react-redux";

import { notificationListSlice } from "../../../redux/notificationSlice";
import { userWaitingFriendsSlice } from "../../../redux/userSlice";

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
        console.log(notification);
        dispatch(notificationListSlice.actions.addNotification(notification));
        dispatch(
          userWaitingFriendsSlice.actions.addItem({
            friendId: notification.senderId.id,
            friendName: notification.senderId.name,
            type: "sender",
          })
        );
      } else if (action === "remove") {
        const { senderId } = notification;
        dispatch(notificationListSlice.actions.removeNotification(senderId));
        dispatch(userWaitingFriendsSlice.actions.removeItem(senderId));
      } else if (action === "decline") {
        console.log(notification);
        dispatch(notificationListSlice.actions.addNotification(notification));
        dispatch(
          userWaitingFriendsSlice.actions.removeItem(notification.senderId.id)
        );
      }
    });
  }, [userid, dispatch]);

  return <></>;
}

export default UserSocket;
