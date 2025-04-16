import { NavLink } from "react-router";
import { useState } from "react";

import InputText from "../../../../components/Utils/InputText/InputText";
import InputPassword from "../../../../components/Utils/InputPassword/InputPassword";
import InputButton from "../../../../components/Utils/InputButton/InputButton";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSumbmitForm = (event) => {
    event.preventDefault();
    const body = {
      username,
      password,
    };

    console.log(body);
  };

  return (
    <div className={styles.rootContainer}>
      <form className={styles.formContainer} onSubmit={onSumbmitForm}>
        <InputText
          id={"usernameLogin"}
          required={true}
          placeholder={"Username"}
          rootContainer={styles.textContainer}
          inputContainer={styles.textInput}
          valueText={username}
          onChangeText={onChangeUsername}
          minLength={3}
        />
        <InputPassword
          id={"passwordLogin"}
          required={true}
          placeholder={"Password"}
          rootContainer={styles.textContainer}
          inputContainer={styles.textInput}
          valuePassword={password}
          onChangePassword={onChangePassword}
          minLength={3}
        />
        <InputButton
          type={"submit"}
          id={"submitLogin"}
          valueButton={"Log in"}
          rootContainer={styles.buttonContainer}
          inputContainer={styles.buttonInput}
        />
      </form>
      <div className={styles.forgetPasswordLink}>
        <NavLink to={"/auth/forgetpassword"}>Forgot password?</NavLink>
      </div>
      <div className={styles.orText}>
        <div></div>
        <p>OR</p>
        <div></div>
      </div>
      <div className={styles.signUpLink}>
        <NavLink to={"/home/signup"}>Create new account</NavLink>
      </div>
    </div>
  );
}

export default LoginForm;
