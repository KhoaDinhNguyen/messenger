import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { nameSlice } from "../../../../redux/userSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./MessageItem.module.css";

function MessageItem({ message }) {
  const params = useParams();
  const senderId = params.userid;
  const senderName = useSelector((state) => state[nameSlice.name]);
  const { receiverId, receiverName, text } = message;

  // if (receiverId !== senderId) this message belongs to current page user

  return (
    <div
      className={
        receiverId !== senderId || message.senderId === message.receiverId
          ? styles.senderContainer
          : styles.receiverContainer
      }
    >
      <div className={styles.imageContainer}>
        <img src={userpublic} alt="user" className={styles.image} />
      </div>
      <div
        className={
          receiverId !== senderId || message.senderId === message.receiverId
            ? styles.senderText
            : styles.receiverText
        }
      >
        <p>{text}</p>
      </div>
    </div>
  );
}

export default MessageItem;
