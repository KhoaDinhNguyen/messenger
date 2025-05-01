import { NavLink, useNavigate } from "react-router";

import Socket from "../../../../pages/User/socket";
import styles from "./UserImageDropList.module.css";

function UserImageDropList() {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    Socket.disconnect();
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
