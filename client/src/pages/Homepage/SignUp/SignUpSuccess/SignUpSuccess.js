import { NavLink } from "react-router";

import styles from "./SignUpSuccess.module.css";

function SignUpSuccess() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.contentContainer}>
        <div>
          <h2 className={styles.title}>Sign up successfully</h2>
        </div>
        <div className={styles.textContainers}>
          <p className={styles.textContainer}>
            Congratulation! Your account has been created.
          </p>
          <p className={styles.textContainer}>
            Log in the account to explore our features
          </p>
          <div className={styles.loginLink}>
            <NavLink to={"/home/login"}>Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpSuccess;
