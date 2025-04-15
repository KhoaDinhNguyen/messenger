import SignUpForm from "./SignUpForm/SignUpForm";

import styles from "./SignUp.module.css";

function SignUp() {
  return (
    <div className={styles.rootContainer}>
      <p className={styles.title}>Sign up</p>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
