import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { nameSlice } from "../../../../redux/userSlice";
import { currentSenderSlice } from "../../../../redux/messageSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./MessageItem.module.css";

function MessageItem({ message }) {
  const params = useParams();
  const senderId = params.userid;
  const senderName = useSelector((state) => state[nameSlice.name]);
  const { receiverId, receiverName, text } = message;
  const sender = useSelector((state) => state[currentSenderSlice.name]);

  if (sender === null) {
    return <></>;
  }
  // if (receiverId !== senderId) this message belongs to current page user

  const currentUserImage =
    sender.friendImageURL && sender.friendImageURL !== ""
      ? sender.friendImageURL
      : userpublic;

  const receiverImg = userpublic;
  return (
    <div
      className={
        receiverId !== senderId || message.senderId === message.receiverId
          ? styles.senderContainer
          : styles.receiverContainer
      }
    >
      <div className={styles.imageContainer}>
        <img
          src={
            receiverId !== senderId || message.senderId === message.receiverId
              ? currentUserImage
              : receiverImg
          }
          alt="user"
          className={styles.image}
        />
      </div>
      <div
        className={
          receiverId !== senderId || message.senderId === message.receiverId
            ? styles.senderText
            : styles.receiverText
        }
      >
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}

export default MessageItem;
