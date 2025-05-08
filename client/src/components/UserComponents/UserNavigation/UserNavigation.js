import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import UserImageDropList from "./UserImageDropList/UserImageDropList";

import { notificationListSlice } from "../../../redux/notificationSlice";
import { profileImageFileURLSlice } from "../../../redux/userSlice";
import {
  FriendSVG,
  MessageSVG,
  NotificationSVG,
  PostsSVG,
} from "../../../utils/svgConfigs/SVG";

import userpublic from "../../../asset/img/userpublic.png";
import pageIcon from "../../../asset/img/pageIcon.jpg";

import styles from "./UserNavigation.module.css";

function UserNavigation() {
  const navigate = useNavigate();
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

  const onClickNavToNotification = () => {
    navigate("notification");
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.pageIconContainer}>
        <img src={pageIcon} alt="page" className={styles.pageIcon} />
      </div>
      <nav>
        <ul className={styles.linkContainers}>
          <li className={styles.linkContainer}>
            <div className={styles.postsSVG}>
              <PostsSVG />
            </div>
            <NavLink to={"posts"} className={linkActive}>
              Posts
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <div className={styles.messageSVG}>
              <MessageSVG />
            </div>
            <NavLink to={"messenger"} className={linkActive}>
              Messenger
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <div className={styles.friendSVG}>
              <FriendSVG />
            </div>
            <NavLink to={"searchuser"} className={linkActive}>
              Friends
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.buttonContainers}>
        <div
          className={styles.notificationContainer}
          onClick={onClickNavToNotification}
        >
          <NotificationSVG />
          {notificationList.length > 0 && (
            <div className={styles.notificationLengthContainer}>
              <p className={styles.notificationLength}>
                {notificationList.length}
              </p>
            </div>
          )}
        </div>
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
    </div>
  );
}

export default UserNavigation;
