import { useEffect } from "react";

import UserInfo from "../../../components/UserComponents/UserInfo/UserInfo";

import styles from "./UserProfile.module.css";

function UserProfile() {
  useEffect(() => {
    document.title = "MessApp | Profile";
  }, []);
  return (
    <div className={styles.rootContainer}>
      <UserInfo />
    </div>
  );
}

export default UserProfile;
