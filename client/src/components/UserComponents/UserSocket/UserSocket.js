import { useEffect } from "react";
import { Manager } from "socket.io-client";
import { useDispatch } from "react-redux";

import { notificationListSlice } from "../../../redux/notificationSlice";

function UserSocket({ userid }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const manager = new Manager(process.env.REACT_APP_SERVER_API, {
      autoConnect: true,
      query: {
        userid: userid,
      },
    });
    const socket = manager.socket("/");
    socket.connect();
    socket.on("notification", (data) => {
      const { action, notification } = data;
      console.log(notification);
      if (action === "friendRequest") {
        dispatch(notificationListSlice.actions.addNotification(notification));
      }
    });
  }, [userid, dispatch]);

  return <></>;
}

export default UserSocket;
