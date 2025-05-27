import { useState, useEffect } from "react";

import InputText from "../../../components/Utils/InputText/InputText";
import InputButton from "../../../components/Utils/InputButton/InputButton";
import InputTextArea from "../../../components/Utils/InputTextArea/InputTextArea";
import FeedbackList from "../FeedbackList/FeedbackList";
import LoadingModal from "../../../components/ContactPageComponents/LoadingModal/LoadingModal";
import SuccessModal from "../../../components/ContactPageComponents/SuccessModal/SuccessModal";
import FailingModal from "../../../components/ContactPageComponents/FailingModal/FailingModal";

import styles from "./ContactPage.module.css";

function ContactPage() {
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    document.title = "MessApp | Contact";
  }, []);

  const onChangeContactName = (event) => {
    setContactName(event.target.value);
  };

  const onChangeContactPhone = (event) => {
    setContactPhone(event.target.value);
  };

  const onChangeContactEmail = (event) => {
    setContactEmail(event.target.value);
  };

  const onChangeMessage = (event) => {
    setContactMessage(event.target.value);
  };

  const onChangeClearErrorMessage = () => {
    setErrorMessage("");
  };
  const onSubmitContactForm = (event) => {
    event.preventDefault();
    setLoading(true);
    const graphQLQuery = {
      query: `
        query SendFeedback($name: String!, $phone: String, $email: String!, $message: String!) {
          sendFeedback(ContactInput:{
            name: $name,
            phone: $phone,
            email: $email,
            message: $message
          }) {
            name,
            phone,
            email,
            message
          }
        }`,
      variables: {
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        message: contactMessage,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    fetch(process.env.REACT_APP_SERVER_API, {
      method: "POST",
      body: bodyJSON,
      headers: myHeaders,
    })
      .then((jsonResonse) => jsonResonse.json())
      .then((response) => {
        setLoading(false);
        if (response.data === undefined) {
          setErrorMessage(response.errors[0].message);
        } else {
          setSuccessMessage(
            `Feedback received. We have sent you an email to ${contactEmail}.`
          );
          setContactName("");
          setContactPhone("");
          setContactEmail("");
          setContactMessage("");

          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        }
      })
      .catch((err) => {
        setErrorMessage(
          "The server is having problems; we cannot receive your feedback at the moment. We are so sorry for this inconvenience."
        );
        setLoading(false);
      });
  };
  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.contactFormContainer}>
          <div className={styles.contactFormContent}>
            <div className={styles.formContainer}>
              <form autoComplete="off" onSubmit={onSubmitContactForm}>
                <InputText
                  id={"contactName"}
                  placeholder={"Your name"}
                  labelText={"Full Name"}
                  required={true}
                  rootContainer={styles.textContainer}
                  labelContainer={styles.textLabel}
                  inputContainer={styles.textInput}
                  valueText={contactName}
                  onChangeText={onChangeContactName}
                />
                <InputText
                  id={"contactPhone"}
                  placeholder={"(012) 345-6789"}
                  labelText={"Phone Number (optional)"}
                  rootContainer={styles.textContainer}
                  labelContainer={styles.textLabel}
                  inputContainer={styles.textInput}
                  pattern={"[0-9]+"}
                  valueText={contactPhone}
                  onChangeText={onChangeContactPhone}
                />
                <InputText
                  id={"contactEmail"}
                  placeholder={"Your email"}
                  labelText={"Email Adress"}
                  required={true}
                  rootContainer={styles.textContainer}
                  labelContainer={styles.textLabel}
                  inputContainer={styles.textInput}
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  valueText={contactEmail}
                  onChangeText={onChangeContactEmail}
                />
                <InputTextArea
                  id={"contactMessage"}
                  placeholder={"Write your message here..."}
                  labelText={"Leave Us a Message"}
                  rootContainer={styles.textContainer}
                  labelContainer={styles.textLabel}
                  inputContainer={styles.textAreaInput}
                  valueText={contactMessage}
                  onChangeText={onChangeMessage}
                />
                <div className={styles.note}>
                  <p>Your information is protected by our company.</p>
                </div>
                <InputButton
                  id={"submitContact"}
                  type={"submit"}
                  labelText={<p className={styles.submitLabelText}>Submit</p>}
                  valueButton={""}
                  inputContainer={styles.submitInput}
                  labelContainer={styles.submitLabel}
                  rootContainer={styles.submitButton}
                />
              </form>
            </div>
            <div className={styles.contactTitleContainer}>
              <div className={styles.contactTitleContent}>
                <div>
                  <h2>Contact us</h2>
                </div>
                <div>
                  <p className={styles.simpleText}>
                    Your helpful feedback makes our community become greater.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FeedbackList />
      </div>
      <LoadingModal visible={loading} />
      <SuccessModal
        visible={!loading && successMessage !== ""}
        message={successMessage}
      />
      <FailingModal
        visible={!loading && errorMessage !== ""}
        message={errorMessage}
        onClickCloseModal={onChangeClearErrorMessage}
      />
    </>
  );
}

export default ContactPage;
