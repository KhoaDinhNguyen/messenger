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

  //console.log(friendsList);
  const friendsMessageList = friendsList.map((friend) => {
    const latestMessage = latestMessages.filter((message) => {
      if (
        (message.senderId === friend.friendId &&
          message.receiverId === params.userid) ||
        (message.receiverId === friend.friendId &&
          message.senderId === params.userid)
      ) {
        return true;
      }
      return false;
    });

    //console.log(latestMessage.length);
    return {
      friend,
      latestMessage: latestMessage.length > 0 ? latestMessage[0] : null,
    };
  });

  const sortedFriendsMessageList = sortFriendsByLatestMessage(
    friendsMessageList,
    params.userid
  );

  //console.log(sortedFriendsMessageList);
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
