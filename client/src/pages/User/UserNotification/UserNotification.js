import { useSelector } from "react-redux";
import { useEffect } from "react";

import NotificationList from "../../../components/UserComponents/NotificationList/NotificationList";

import { notificationListSlice } from "../../../redux/notificationSlice";

import styles from "./UserNotification.module.css";

function UserNotification() {
  const notificationsList = useSelector(
    (state) => state[notificationListSlice.name]
  );

  useEffect(() => {
    document.title = "MessApp | Notification";
  }, []);
  return (
    <div className={styles.rootContainer}>
      {notificationsList.length > 0 && (
        <>
          <p>You have {notificationsList.length} notification(s)</p>
          <div className={styles.notificationsContainer}>
            <NotificationList notificationsList={notificationsList} />
          </div>
        </>
      )}
      {notificationsList.length === 0 && (
        <p>You do not have any notifications</p>
      )}
    </div>
  );
}

export default UserNotification;
