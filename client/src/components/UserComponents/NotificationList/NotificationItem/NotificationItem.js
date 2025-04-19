import FriendRequest from "./FriendRequest/FriendRequest";

import styles from "./NotificationItem.module.css";

function NotificationItem({ notification }) {
  const { type } = notification;

  let notificationItem;

  if (type === "friendRequest") {
    notificationItem = <FriendRequest notification={notification} />;
  }
  return <div className={styles.rootContainer}>{notificationItem}</div>;
}

export default NotificationItem;
