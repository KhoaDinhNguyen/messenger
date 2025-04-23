import { useSelector } from "react-redux";

import FriendItem from "./FriendItem/FriendItem";

import { userFriendsSlice } from "../../../redux/userSlice";

import styles from "./FriendList.module.css";

function FriendList({ setSearchParams }) {
  const friendsList = useSelector((state) => state[userFriendsSlice.name]);

  const friendsListRender = friendsList.map((friend) => {
    return (
      <li key={friend.friendId}>
        <FriendItem friend={friend} setSearchParams={setSearchParams} />
      </li>
    );
  });
  return (
    <div className={styles.rootContainer}>
      <ul className={styles.friendList}>{friendsListRender}</ul>
    </div>
  );
}

export default FriendList;
