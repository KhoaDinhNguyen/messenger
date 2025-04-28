import UserImage from "./UserImage/UserImage";
import UserDetails from "./UserDetails/UserDetails";
import UserFriends from "./UserFriends/UserFriends";

import styles from "./UserInfo.module.css";

function UserInfo() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.imageContainer}>
        <UserImage />
        <UserFriends />
      </div>

      <div>
        <UserDetails />
      </div>
    </div>
  );
}

export default UserInfo;
