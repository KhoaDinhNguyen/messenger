import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./FriendItem.module.css";

function FriendItem({ friend, setSearchParams }) {
  const onClickFriendItem = () => {
    setSearchParams((prev) => {
      prev.set("friendId", friend.friendId);
      prev.set("friendName", friend.friendName);
      return prev;
    });
  };
  return (
    <div className={styles.rootContainer} onClick={onClickFriendItem}>
      <div>
        <img src={userpublic} alt="user" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.name}>{friend.friendName}</p>
      </div>
    </div>
  );
}

export default FriendItem;
