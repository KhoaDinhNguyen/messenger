import UserInfo from "../../../components/UserComponents/UserInfo/UserInfo";

import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={styles.rootContainer}>
      <UserInfo />
    </div>
  );
}

export default UserProfile;
