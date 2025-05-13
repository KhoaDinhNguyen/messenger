import { useSelector } from "react-redux";
import { useParams } from "react-router";

import FriendItem from "./FriendItem/FriendItem";

import { userFriendsSlice } from "../../../redux/userSlice";
import { latestMessageSlice } from "../../../redux/messageSlice";
import { sortFriendsByLatestMessage } from "../../../utils/friendsConfigs/sortFriends";

import styles from "./FriendList.module.css";

function FriendList({ setSearchParams }) {
  const params = useParams();
  const friendsList = useSelector((state) => state[userFriendsSlice.name]);
  const latestMessages = useSelector((state) => state[latestMessageSlice.name]);

  const friendsMessageList = friendsList.map((friend) => {
    console.log(friend);
    console.log(latestMessages);
    const latestMessage = latestMessages.filter((message) => {
      console.log(message);
      if (
        (message &&
          message.senderId === friend.friendId &&
          message.receiverId === params.userid) ||
        (message &&
          message.receiverId === friend.friendId &&
          message.senderId === params.userid)
      ) {
        return true;
      }
      return false;
    });

    return {
      friend,
      latestMessage: latestMessage.length > 0 ? latestMessage[0] : null,
    };
  });

  const sortedFriendsMessageList = sortFriendsByLatestMessage(
    friendsMessageList,
    params.userid
  );

  const friendsListRender = sortedFriendsMessageList.map((friendMessage) => {
    const { friend, latestMessage } = friendMessage;
    return (
      <li key={friend.friendId}>
        <FriendItem
          friend={friend}
          setSearchParams={setSearchParams}
          latestMessage={latestMessage}
        />
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
