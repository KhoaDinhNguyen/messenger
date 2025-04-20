import FriendRequest from "./FriendRequest/FriendRequest";
import DeclineFriendRequest from "./DeclineFriendRequest/DeclineFriendRequest";

import styles from "./NotificationItem.module.css";

function NotificationItem({ notification }) {
  const { type } = notification;
  console.log(notification);
  let notificationItem;

  if (type === "friendRequest") {
    notificationItem = <FriendRequest notification={notification} />;
  } else if (type === "declineFriendRequest") {
    notificationItem = <DeclineFriendRequest notification={notification} />;
  }
  return <div className={styles.rootContainer}>{notificationItem}</div>;
}

export default NotificationItem;
