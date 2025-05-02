import { useSelector } from "react-redux";

import MessageItem from "../MessageItem/MessageItem";
import MessageDate from "../MessageDate/MessageDate";

import { currentMessageSlice } from "../../../../redux/messageSlice";
import { getMessageByDates } from "../../../../utils/messageConfigs/getMessageByDates";

import styles from "./MessageList.module.css";

function MessageList() {
  const messagesList = useSelector((state) => state[currentMessageSlice.name]);

  const messagesDates = getMessageByDates(messagesList);
  console.log(messagesDates);

  const messagesDateListRender = messagesDates.map((messageDate) => {
    console.log(messageDate);
    return (
      <li key={messageDate.date}>
        <MessageDate
          date={messageDate.date}
          messagesList={messageDate.messages}
        />
      </li>
    );
  });

  // return (
  //   <div className={styles.rootContainer}>
  //     <ul className={styles.messagesList}>{messagesListRender}</ul>
  //   </div>
  // );

  return (
    <div className={styles.rootContainer}>
      <ul className={styles.messagesDateList}>{messagesDateListRender}</ul>
    </div>
  );
}

export default MessageList;
