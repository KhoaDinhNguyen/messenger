import { useSelector } from "react-redux";
import { NavLink } from "react-router";

import { notificationListSlice } from "../../../redux/notificationSlice";

import styles from "./UserNavigation.module.css";

function UserNavigation() {
  const notificationList = useSelector(
    (state) => state[notificationListSlice.name]
  );

  const linkActive = ({ isActive }) => {
    return isActive ? styles.activeLink : "";
  };

  return (
    <div className={styles.rootContainer}>
      <nav>
        <ul className={styles.linkContainers}>
          <li className={styles.linkContainer}>
            <NavLink to={"messenger"} className={linkActive}>
              Messenger
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <NavLink to={"searchuser"} className={linkActive}>
              Friends
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <NavLink to={"notification"} className={linkActive}>
              Notifications ({notificationList.length})
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default UserNavigation;
