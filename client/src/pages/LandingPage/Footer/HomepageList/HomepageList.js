import { NavLink } from "react-router";

import styles from "./HomepageList.module.css";

function HomepageList() {
  const linkActive = ({ isActive }) => {
    return isActive ? styles.activeLink : "";
  };

  const onClickScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.rootContainer}>
      <div>
        <h3 className={styles.title}>Homepage</h3>
      </div>
      <div>
        <ul className={styles.list}>
          <li>
            <NavLink
              to={"/"}
              className={linkActive}
              onClick={onClickScrollToTop}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/feature"}
              className={linkActive}
              onClick={onClickScrollToTop}
            >
              Feature
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              className={linkActive}
              onClick={onClickScrollToTop}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomepageList;
