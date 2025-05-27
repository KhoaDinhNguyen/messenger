import { useEffect } from "react";

import LoginForm from "../../../components/LoginComponents/LoginForm/LoginForm";

import styles from "./Login.module.css";

function Login() {
  useEffect(() => {
    document.title = "MessApp | Login";
  }, []);
  return (
    <div className={styles.rootContainer}>
      <p className={styles.title}>Login</p>
      <LoginForm />
    </div>
  );
}

export default Login;
