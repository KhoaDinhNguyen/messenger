import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

import InputText from "../../Utils/InputText/InputText";
import InputPassword from "../../Utils/InputPassword/InputPassword";
import InputSelect from "../../Utils/InputSelect/InputSelect";
import InputButton from "../../Utils/InputButton/InputButton";
import InputRadio from "../../Utils/InputRadio/InputRadio";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import LoadingModal from "../../Utils/Modal/LoadingModal/LoadingModal";

import { dates, months, years } from "../../../utils/dateConfigs/date";
import { formatName } from "../../../utils/nameConfigs/format";
import { formatDate } from "../../../utils/dateConfigs/format";
import { getPronounce } from "../../../utils/genderConfigs/format";
import { convertMonthToNum } from "../../../utils/dateConfigs/converNumToDates";

import styles from "./SignUpForm.module.css";

function SignUpForm() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [pronounce, setPronounce] = useState("");
  const [errorGender, setErrorGender] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState([]);

  const navigate = useNavigate();

  const onChangeAccount = (event) => {
    setAccount(event.target.value);
    setErrorForm((errors) =>
      errors.filter((error) => error !== "Username has existed")
    );
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setErrorPassword((message) => []);
  };

  const onChangeConfirmedPassword = (event) => {
    setConfirmedPassword(event.target.value);
    setErrorPassword((message) => []);
  };

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const onChangeMiddleName = (event) => {
    setMiddleName(event.target.value);
  };

  const onChangeDate = (event) => {
    setDate(event.target.value);
  };

  const onChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const onChangeYear = (event) => {
    setYear(event.target.value);
  };

  const onChangeRadio = (event) => {
    setGender(event.target.value);
    setErrorGender((messages) => []);
  };

  const onChangePronounce = (event) => {
    setPronounce(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrorForm((errors) =>
      errors.filter((error) => error !== "Email has been used")
    );
  };

  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (gender === "") {
      setErrorGender((messages) => [...messages, "Gender is required"]);
    } else if (password !== confirmedPassword) {
      setErrorPassword((message) => [
        ...message,
        "Confirmed password is incorrect",
      ]);
    } else {
      const graphQLQuery = {
        query: `
          mutation CreateUser($username: String!, $password: String!, $name: String!, $email: String, $dob: String!, $gender: String!, $pronounce: String, $phone: String){
            createUser(
              userInput: {
                username: $username
                password: $password
                name: $name
                dob: $dob
                gender: $gender
                pronounce: $pronounce
                email: $email
                phone: $phone
              }
            ) {
              username
            }
          }
        `,
        variables: {
          username: account,
          password: password,
          name: formatName(firstName, middleName, lastName),
          dob: formatDate(date, convertMonthToNum(month), year),
          gender: gender,
          email: email,
          phone: phone,
          pronounce: getPronounce(gender, ""),
        },
      };

      const bodyJSON = JSON.stringify(graphQLQuery);
      const myHeader = new Headers();
      myHeader.append("Content-type", "application/json");

      try {
        const jsonResponse = await fetch(process.env.REACT_APP_SERVER_API, {
          method: "POST",
          body: bodyJSON,
          headers: myHeader,
        });

        setLoading(false);
        const response = await jsonResponse.json();

        if (response.data === null) {
          setErrorForm([...response.errors[0].data]);
        } else {
          navigate("/signupsuccess");
        }
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <>
      <div className={styles.rootContainer}>
        <form className={styles.formContainer} onSubmit={onSubmitHandler}>
          <div>
            <p className={styles.title}>Account</p>
            <InputText
              id={"usernameSignUp"}
              required={true}
              placeholder={"Username"}
              minLength={3}
              rootContainer={styles.textContainer}
              inputContainer={styles.textInput}
              valueText={account}
              onChangeText={onChangeAccount}
            />
            <div className={styles.passwordContainer}>
              <InputPassword
                id={"passwordSignUp"}
                required={true}
                placeholder={"Password"}
                minLength={3}
                rootContainer={`${styles.textContainer} ${
                  errorPassword.length > 0 ? styles.errorInput : ""
                }`}
                inputContainer={styles.textInput}
                valuePassword={password}
                onChangePassword={onChangePassword}
              />
              <InputPassword
                id={"confirmedPasswordSignUp"}
                required={true}
                placeholder={"Confirmed password"}
                minLength={3}
                rootContainer={`${styles.textContainer} ${
                  errorPassword.length > 0 ? styles.errorInput : ""
                }`}
                inputContainer={styles.textInput}
                valuePassword={confirmedPassword}
                onChangePassword={onChangeConfirmedPassword}
              />
            </div>
            <ErrorMessages messageList={errorPassword} />
          </div>
          <div>
            <p className={styles.title}>Name</p>
            <div className={styles.nameContainer}>
              <InputText
                id={"firstNameSignUp"}
                required={true}
                placeholder={"First name"}
                minLength={3}
                rootContainer={styles.textContainer}
                inputContainer={styles.textInput}
                valueText={firstName}
                onChangeText={onChangeFirstName}
              />
              <div className={styles.secondRowNameContainer}>
                <InputText
                  id={"middleNameSignUp"}
                  placeholder={"Middle name (optional)"}
                  rootContainer={styles.textContainer}
                  inputContainer={styles.textInput}
                  valueText={middleName}
                  onChangeText={onChangeMiddleName}
                />
                <InputText
                  id={"lastNameSignUp"}
                  required={true}
                  placeholder={"Last name"}
                  minLength={3}
                  rootContainer={styles.textContainer}
                  inputContainer={styles.textInput}
                  valueText={lastName}
                  onChangeText={onChangeLastName}
                />
              </div>
            </div>
          </div>
          <div>
            <p className={styles.title}>Birthday</p>
            <div className={styles.datesContainer}>
              <InputSelect
                id={"monthSignUp"}
                optionList={months}
                required={true}
                selectContainer={styles.selectContainer}
                valueOption={month}
                onChangeOption={onChangeMonth}
                titleName={"Month"}
              />
              <InputSelect
                id={"dateSignUp"}
                optionList={dates}
                required={true}
                selectContainer={styles.selectContainer}
                valueOption={date}
                onChangeOption={onChangeDate}
                titleName={"Day"}
              />
              <InputSelect
                id={"yearSignUp"}
                optionList={years}
                required={true}
                selectContainer={styles.selectContainer}
                valueOption={year}
                onChangeOption={onChangeYear}
                titleName={"Year"}
              />
            </div>
          </div>
          <div>
            <p className={styles.title}>Gender</p>
            <div className={styles.genderOptions}>
              <InputRadio
                id={"male"}
                name={"gender"}
                labelText={"Male"}
                onChangeRadio={onChangeRadio}
                checked={gender === "male"}
                rootContainer={`${styles.genderOption} ${
                  errorGender.length > 0 ? styles.errorInput : ""
                }`}
              />
              <InputRadio
                id={"female"}
                name={"gender"}
                labelText={"Female"}
                onChangeRadio={onChangeRadio}
                checked={gender === "female"}
                rootContainer={`${styles.genderOption} ${
                  errorGender.length > 0 ? styles.errorInput : ""
                }`}
              />
              <InputRadio
                id={"other"}
                name={"gender"}
                labelText={"Other"}
                onChangeRadio={onChangeRadio}
                checked={gender === "other"}
                rootContainer={`${styles.genderOption} ${
                  errorGender.length > 0 ? styles.errorInput : ""
                }`}
              />
            </div>
            {gender === "other" && (
              <div>
                <InputText
                  id={"pronounce"}
                  placeholder={"Enter your pronounce (optional)"}
                  rootContainer={styles.textContainer}
                  inputContainer={styles.textInput}
                  valueText={pronounce}
                  onChangeText={onChangePronounce}
                />
              </div>
            )}
            <ErrorMessages messageList={errorGender} />
          </div>
          <div>
            <p className={styles.title}>Optional. Protect your account</p>
            <div className={styles.contactContainer}>
              <InputText
                id={"emailSignUp"}
                placeholder={"Email"}
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                rootContainer={styles.textContainer}
                inputContainer={styles.textInput}
                valueText={email}
                onChangeText={onChangeEmail}
              />
              <InputText
                id={"phoneSignUp"}
                placeholder={"Phone number"}
                pattern={"[0-9]+"}
                rootContainer={styles.textContainer}
                inputContainer={styles.textInput}
                valueText={phone}
                onChangeText={onChangePhone}
              />
            </div>
          </div>
          <div>
            <ErrorMessages messageList={errorForm} />
          </div>
          <InputButton
            type={"submit"}
            id={"sumbmitSignUp"}
            valueButton={"Create new account"}
            rootContainer={styles.buttonContainer}
            inputContainer={styles.buttonInput}
          />
        </form>
        <div className={styles.loginLink}>
          <NavLink to={"/home/login"}>Already have account?</NavLink>
        </div>
      </div>
      <LoadingModal visible={loading} message={"Creating an account"} />
    </>
  );
}

export default SignUpForm;
