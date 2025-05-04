import MessageItem from "../MessageItem/MessageItem";

import { formatDateString } from "../../../../utils/dateConfigs/format";

import styles from "./MessageDate.module.css";

function MessageDate({ date, messagesList }) {
  const messagesListRender = messagesList.map((message) => (
    <li key={message._id}>
      <MessageItem message={message} />
    </li>
  ));

  return (
    <div className={styles.rootContainer}>
      <div className={styles.dateContainer}>
        <div className={styles.line}></div>
        <p>{formatDateString(date)}</p>
        <div className={styles.line}></div>
      </div>
      <div>
        <ul className={styles.messagesList}>{messagesListRender}</ul>
      </div>
    </div>
  );
}

export default MessageDate;
