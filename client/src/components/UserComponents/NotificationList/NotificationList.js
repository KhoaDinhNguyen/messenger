import NotificationItem from "./NotificationItem/NotificationItem";

import styles from "./NotificationList.module.css";

function NotificationList({ notificationsList }) {
  const notificationListRender = notificationsList.map((notification) => {
    return (
      <li key={notification._id}>
        <NotificationItem notification={notification} />
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.notificationsList}>{notificationListRender}</ul>
    </div>
  );
}

export default NotificationList;
