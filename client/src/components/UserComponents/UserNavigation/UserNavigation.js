import { NavLink } from "react-router";

import styles from "./UserNavigation.module.css";

function UserNavigation() {
  const linkActive = ({ isActive }) => {
    return isActive ? styles.activeLink : "";
  };
  return (
    <div className={styles.rootContainer}>
      <nav>
        <ul className={styles.linkContainers}>
          <li className={styles.linkContainer}>
            <NavLink to={"searchuser"} className={linkActive}>
              Friends
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default UserNavigation;
