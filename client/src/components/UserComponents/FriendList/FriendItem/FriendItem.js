import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./FriendItem.module.css";

function FriendItem({ friend }) {
  return (
    <div className={styles.rootContainer}>
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
