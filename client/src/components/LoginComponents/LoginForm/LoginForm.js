import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import InputText from "../../Utils/InputText/InputText";
import InputPassword from "../../Utils/InputPassword/InputPassword";
import InputButton from "../../Utils/InputButton/InputButton";
import ErrorMessages from "../../SignUpComponents/ErrorMessages/ErrorMessages";
import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setErrorForm((errors) =>
      errors.filter((error) => error !== "User does not exist")
    );
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setErrorForm((errors) =>
      errors.filter((error) => error !== "Password is incorrect")
    );
  };

  const onSumbmitForm = async (event) => {
    setLoading(true);
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
      setLoading(false);
      if (response.data === null) {
        setErrorForm([...response.errors[0].data]);
      } else {
        setSuccess(true);
        setTimeout(() => {
          const { findUser } = response.data;
          const { _id } = findUser;
          navigate(`/user/${_id}`);
          setSuccess(false);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
          <div className={styles.errorMessages}>
            <ErrorMessages messageList={errorForm} />
          </div>
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
      <LoadingModal visible={loading} />
      <SuccessModal visible={success} />
    </>
  );
}

export default LoginForm;
