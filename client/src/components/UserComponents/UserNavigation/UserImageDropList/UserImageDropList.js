import { NavLink, useNavigate } from "react-router";

import styles from "./UserImageDropList.module.css";

function UserImageDropList() {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    navigate("/home/login");
  };
  return (
    <div className={styles.rootContainer}>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>
          <NavLink to={"profile"}>Your profile</NavLink>
        </li>
        <li className={styles.listItem} onClick={onClickLogOut}>
          <p>Log out</p>
        </li>
      </ul>
    </div>
  );
}

export default UserImageDropList;
