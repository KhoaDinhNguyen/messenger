import InputButton from "../../../../Utils/InputButton/InputButton";

import userpublic from "../../../../../asset/img/userpublic.png";

import styles from "./AcceptFriendRequest.module.css";

function AcceptFriendRequest({ notification }) {
  const { senderId, message } = notification;

  return (
    <div>
      <p className={styles.title}>Friend Request Accepted</p>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <img alt="user" src={userpublic} className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.sender}>From: {senderId.name}</p>
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <InputButton
            id={`ok_${senderId}`}
            type={"button"}
            valueButton={"ok"}
            inputContainer={styles.acceptInput}
          />
        </div>
      </div>
    </div>
  );
}

export default AcceptFriendRequest;
