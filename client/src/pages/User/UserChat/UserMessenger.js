import FriendList from "../../../components/UserComponents/FriendList/FriendList";
import FriendInfo from "../../../components/UserComponents/FriendInfo/FriendInfo";
import MessengerBox from "../../../components/UserComponents/MessengerBox/MessengerBox";

import styles from "./UserChat.module.css";

function UserMessenger() {
  return (
    <div className={styles.rootContainer}>
      <FriendList />
      <MessengerBox />
      <FriendInfo />
    </div>
  );
}

export default UserMessenger;
