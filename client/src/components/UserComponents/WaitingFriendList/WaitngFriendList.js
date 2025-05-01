import { useSelector } from "react-redux";

import WaitingFriendItem from "./WaitingFriendItem/WaitingFriendItem";

import { userWaitingFriendsSlice } from "../../../redux/userSlice";

import styles from "./WaitingFriendList.module.css";

function WaitingFriendList() {
  const waitingFriendsList = useSelector(
    (state) => state[userWaitingFriendsSlice.name]
  );

  //console.log(waitingFriendsList);
  const waitingFriendsListRender = waitingFriendsList.map((friend) => {
    return (
      <li key={friend.friendId}>
        <WaitingFriendItem friend={friend} />
      </li>
    );
  });

  if (waitingFriendsList.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.rootContainer}>
      <ul className={styles.listContainer}>{waitingFriendsListRender}</ul>
    </div>
  );
}

export default WaitingFriendList;
