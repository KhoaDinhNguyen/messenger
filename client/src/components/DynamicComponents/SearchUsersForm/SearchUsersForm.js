import { useState } from "react";

import InputText from "../../Utils/InputText/InputText";
import InputButton from "../../Utils/InputButton/InputButton";

import styles from "./SearchUsersForm.module.css";

function SearchUsersForm({ setUsersList, setLoading }) {
  const [searchString, setSearchString] = useState("");

  const onChangSearchString = (event) => {
    setSearchString(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const graphQLQuery = {
      query: `
        query FindUserByName($name: String!) {
          findUserByName(userInput: {name: $name}) {
            _id,
            name,
            profileUrl
            pronounce
            profileImageURL
            profileImageName
          }
        }
      `,
      variables: {
        name: searchString,
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

      const response = await jsonResponse.json();
      setUsersList(response.data.findUserByName);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={onSubmitForm}>
        <InputText
          id={"searchUser"}
          placeholder={"Find your friends"}
          minLength={3}
          valueText={searchString}
          onChangeText={onChangSearchString}
          rootContainer={styles.textContainer}
          inputContainer={styles.textInput}
        />
        <InputButton
          type={"submit"}
          id={"submitSearchUser"}
          valueButton={"Find"}
          inputContainer={styles.submitInput}
        />
      </form>
    </div>
  );
}

export default SearchUsersForm;
