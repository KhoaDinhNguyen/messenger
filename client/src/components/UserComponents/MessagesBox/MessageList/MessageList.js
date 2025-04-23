import { useSelector } from "react-redux";

import MessageItem from "../MessageItem/MessageItem";

import { currentMessageSlice } from "../../../../redux/messageSlice";

import styles from "./MessageList.module.css";

function MessageList() {
  const messagesList = useSelector((state) => state[currentMessageSlice.name]);

  const messagesListRender = messagesList.map((message) => (
    <li key={message._id}>
      <MessageItem message={message} />
    </li>
  ));

  return (
    <div className={styles.rootContainer}>
      <ul className={styles.messagesList}>{messagesListRender}</ul>
    </div>
  );
}

export default MessageList;
