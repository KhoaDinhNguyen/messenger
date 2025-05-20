import { NavLink, useNavigate } from "react-router";

import InputButton from "../../../components/Utils/InputButton/InputButton";
import pageIcon from "../../../asset/img/pageIcon.jpg";

import styles from "./LandingPageNavigation.module.css";

function LandingPageNavigation() {
  const navigate = useNavigate();

  const linkActive = ({ isActive }) => {
    return isActive ? styles.activeLink : "";
  };

  const onClickNavigateToLogin = () => {
    navigate("./home/login");
  };

  return (
    <div className={styles.rootContainer}>
      <div>
        <figure className={styles.logoContainer}>
          <img src={pageIcon} alt="Page Icon" className={styles.image} />
          <figcaption className={styles.appName}>MessApp</figcaption>
        </figure>
      </div>
      <div className={styles.listNavContainer}>
        <nav>
          <ul className={styles.listNav}>
            <li className={styles.navContainer}>
              <NavLink to={"./"} className={linkActive}>
                Home
              </NavLink>
            </li>
            <li className={styles.navContainer}>
              <NavLink to="./feature" className={linkActive}>
                Feature
              </NavLink>
            </li>
            <li className={styles.navContainer}>
              <NavLink to="./contact" className={linkActive}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <InputButton
          type={"button"}
          valueButton={""}
          id={"getStartedAtNav"}
          labelText={<p className={styles.labelText}>Get started</p>}
          inputContainer={styles.getStartInput}
          labelContainer={styles.getStartLabel}
          rootContainer={styles.getStartButton}
          onClickHandler={onClickNavigateToLogin}
        />
      </div>
    </div>
  );
}

export default LandingPageNavigation;
