import styles from "./AuthenticationPageList.module.css";

import { NavLink } from "react-router";

function AuthenticationPageList() {
  const linkActive = ({ isActive }) => {
    return isActive ? styles.activeLink : "";
  };

  const onClickScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <div>
        <h3 className={styles.title}>Authentication Page</h3>
      </div>
      <div>
        <ul className={styles.list}>
          <li>
            <NavLink
              to={"/home/login"}
              className={linkActive}
              onClick={onClickScrollToTop}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/home/signUp"}
              className={linkActive}
              onClick={onClickScrollToTop}
            >
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/auth/forgetpassword"}
              className={linkActive}
              onClick={onClickScrollToTop}
            >
              Forget password
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AuthenticationPageList;
