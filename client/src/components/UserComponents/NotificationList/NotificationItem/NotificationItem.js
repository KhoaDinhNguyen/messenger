import FriendRequest from "./FriendRequest/FriendRequest";
import DeclineFriendRequest from "./DeclineFriendRequest/DeclineFriendRequest";
import AcceptFriendRequest from "./AcceptFriendRequest/AcceptFriendRequst";

import styles from "./NotificationItem.module.css";

function NotificationItem({ notification }) {
  const { type } = notification;

  let notificationItem;

  if (type === "friendRequest") {
    notificationItem = <FriendRequest notification={notification} />;
  } else if (type === "declineFriendRequest") {
    notificationItem = <DeclineFriendRequest notification={notification} />;
  } else if (type === "acceptFriendRequest") {
    notificationItem = <AcceptFriendRequest notification={notification} />;
  }
  return <div className={styles.rootContainer}>{notificationItem}</div>;
}

export default NotificationItem;
