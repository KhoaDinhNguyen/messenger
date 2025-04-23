import { ErrorSignUpSVG } from "../../../utils/svgConfigs/SVG";

import styles from "./ErrorMessages.module.css";

function ErrorMessages({ messageList }) {
  if (messageList.length === 0) {
    return <></>;
  }
  const messages = messageList.map((message) => (
    <li className={styles.error} key={message}>
      <ErrorSignUpSVG />
      <p className={styles.errorMessage}>{message}</p>
    </li>
  ));

  return (
    <div>
      <ul className={styles.listMessages}>{messages}</ul>
    </div>
  );
}

export default ErrorMessages;
