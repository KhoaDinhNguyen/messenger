import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { useState } from "react";

import UserImageDropList from "./UserImageDropList/UserImageDropList";

import { notificationListSlice } from "../../../redux/notificationSlice";
import { profileImageFileURLSlice } from "../../../redux/userSlice";

import userpublic from "../../../asset/img/userpublic.png";

import styles from "./UserNavigation.module.css";

function UserNavigation() {
  const [visibleDropList, setVisibleDropList] = useState(false);

  const imageFileURL = useSelector(
    (state) => state[profileImageFileURLSlice.name]
  );
  const notificationList = useSelector(
    (state) => state[notificationListSlice.name]
  );

  const linkActive = ({ isActive }) => {
    return isActive ? styles.activeLink : "";
  };

  const onClickOpenDropList = () => {
    setVisibleDropList((state) => !state);
  };
  return (
    <div className={styles.rootContainer}>
      <div></div>
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
      <div className={styles.userImageContainer}>
        <img
          className={styles.userImage}
          src={
            imageFileURL === "" || imageFileURL === null
              ? userpublic
              : imageFileURL
          }
          alt="user"
          onClick={onClickOpenDropList}
        />
        <div
          className={`${styles.userImageDropList} ${
            visibleDropList ? styles.visibleDropList : styles.hiddenDropList
          }`}
        >
          <UserImageDropList />
        </div>
      </div>
    </div>
  );
}

export default UserNavigation;
