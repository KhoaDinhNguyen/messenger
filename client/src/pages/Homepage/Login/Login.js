import LoginForm from "./LoginForm/LoginForm";

import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.rootContainer}>
      <p className={styles.title}>Login</p>
      <LoginForm />
    </div>
  );
}

export default Login;
