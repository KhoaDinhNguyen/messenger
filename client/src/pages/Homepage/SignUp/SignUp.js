import { useEffect } from "react";

import SignUpForm from "../../../components/SignUpComponents/SignUpForm/SignUpForm";

import styles from "./SignUp.module.css";

function SignUp() {
  useEffect(() => {
    document.title = "MessApp | Sign Up";
  }, []);

  return (
    <div className={styles.rootContainer}>
      <p className={styles.title}>Sign up</p>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
