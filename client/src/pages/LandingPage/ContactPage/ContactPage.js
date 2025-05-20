import InputText from "../../../components/Utils/InputText/InputText";
import InputButton from "../../../components/Utils/InputButton/InputButton";
import InputTextArea from "../../../components/Utils/InputTextArea/InputTextArea";

import styles from "./ContactPage.module.css";

function ContactPage() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.contactFormContainer}>
        <div className={styles.contactFormContent}>
          <div className={styles.formContainer}>
            <form autoComplete="off">
              <InputText
                id={"contactName"}
                placeholder={"Your name"}
                labelText={"Full Name"}
                required={true}
                rootContainer={styles.textContainer}
                labelContainer={styles.textLabel}
                inputContainer={styles.textInput}
              />
              <InputText
                id={"contactPhone"}
                placeholder={"(012) 345-6789"}
                labelText={"Phone Number"}
                rootContainer={styles.textContainer}
                labelContainer={styles.textLabel}
                inputContainer={styles.textInput}
                pattern={"[0-9]+"}
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
              />
              <InputTextArea
                id={"contactMessage"}
                placeholder={"Write your message here..."}
                labelText={"Leave Us a Message"}
                rootContainer={styles.textContainer}
                labelContainer={styles.textLabel}
                inputContainer={styles.textAreaInput}
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
                  Your helpful feedback definitely makes our community become
                  greater.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
