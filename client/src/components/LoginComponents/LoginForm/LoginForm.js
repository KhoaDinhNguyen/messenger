import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import InputText from "../../Utils/InputText/InputText";
import InputPassword from "../../Utils/InputPassword/InputPassword";
import InputButton from "../../Utils/InputButton/InputButton";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSumbmitForm = async (event) => {
    event.preventDefault();
    const body = {
      username,
      password,
    };

    const graphQLQuery = {
      query: `query FindUser($username: String!, $password: String!){
          findUser(userInput: {username: $username, password: $password}) {
            _id,
            gender,
            pronounce,
            name,
            phone,
            dob,
            friends{
              friendId
              friendName
            }
          }
        }`,
      variables: {
        username: username,
        password: password,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    try {
      const jsonResponse = await fetch(process.env.REACT_APP_SERVER_API, {
        method: "POST",
        body: bodyJSON,
        headers: myHeaders,
      });

      const response = await jsonResponse.json();
      if (response.data === null) {
        const errorArray = response.errors;
        //fix for many errors
        const firstError = errorArray[0];
        const error = new Error(firstError.message);
        error.status = firstError.status;
        throw error;
      } else {
        const { findUser } = response.data;
        const { _id } = findUser;
        navigate(`/user/${_id}`);
      }
    } catch (err) {
      alert(err);
    }
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
