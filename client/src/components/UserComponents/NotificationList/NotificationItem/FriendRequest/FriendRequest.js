import InputButton from "../../../../Utils/InputButton/InputButton";

import userpublic from "../../../../../asset/img/userpublic.png";

import styles from "./FriendRequest.module.css";

function FriendRequest({ notification }) {
  const { message, senderId } = notification;
  const senderName = senderId.name;

  return (
    <div>
      <p className={styles.title}>Friend Request</p>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <img alt="user" src={userpublic} className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.sender}>From: {senderName}</p>
          <p className={styles.message}>Message: {message}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <InputButton
            id={`decline_${senderId}`}
            type={"button"}
            valueButton={"Decline"}
            inputContainer={styles.declineInput}
          />
          <InputButton
            id={`accept_${senderId}`}
            type={"button"}
            valueButton={"Accept"}
            inputContainer={styles.acceptInput}
          />
        </div>
      </div>
    </div>
  );
}

export default FriendRequest;
