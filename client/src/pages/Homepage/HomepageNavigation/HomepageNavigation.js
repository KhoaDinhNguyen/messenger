import { NavLink } from "react-router";

import styles from "./HomepageNavigation.module.css";

function HomepageNavigation() {
  const linkActive = ({ isActive }) => {
    return isActive ? styles.activeLink : "";
  };
  return (
    <div className={styles.rootContainer}>
      <nav>
        <ul className={styles.linkContainers}>
          <li className={styles.linkContainer}>
            <NavLink to={"../"} className={linkActive}>
              Home
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <NavLink to={"/home/login"} className={linkActive}>
              Login
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <NavLink to={"/home/signup"} className={linkActive}>
              Sign up
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <NavLink to={"/home/searchuser"} className={linkActive}>
              Friends
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomepageNavigation;
