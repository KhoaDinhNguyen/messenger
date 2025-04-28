import { useSelector } from "react-redux";

import { userFriendsSlice } from "../../../../redux/userSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./UserFriends.module.css";

function UserFriends() {
  const friendList = useSelector((state) => state[userFriendsSlice.name]);

  if (friendList.length === 0) {
    return (
      <div>
        <p>You do have any friends yet</p>
      </div>
    );
  }

  const friendListRender = friendList.map((friend) => {
    return (
      <li key={friend.friendId} className={styles.listItem}>
        <img
          src={userpublic}
          alt="friendIcon"
          title={friend.friendName}
          className={styles.image}
        />
      </li>
    );
  });

  return (
    <div className={styles.rootContainer}>
      <p>Your friends:</p>
      <ul className={styles.listContainer}>{friendListRender}</ul>
    </div>
  );
}

export default UserFriends;
