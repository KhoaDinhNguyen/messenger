import { NavLink } from "react-router";

import styles from "./UserImageDropList.module.css";

function UserImageDropList() {
  return (
    <div className={styles.rootContainer}>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>
          <NavLink to={"profile"}>Your profile</NavLink>
        </li>
        <li className={styles.listItem}>
          <p>Log out</p>
        </li>
      </ul>
    </div>
  );
}

export default UserImageDropList;
