import notfounduser from "../../../asset/img/notfounduser.png";

import styles from "./UserNotFound.module.css";

function UserNotFound() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.titleContainer}>
        <img src={notfounduser} alt="404" />
        <p className={styles.title}>Not found user</p>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>
          User does not exist. Please recheck the url.
        </p>
      </div>
    </div>
  );
}

export default UserNotFound;
