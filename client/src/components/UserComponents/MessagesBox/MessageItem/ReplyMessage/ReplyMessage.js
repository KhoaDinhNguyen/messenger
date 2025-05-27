import { useParams } from "react-router";
import { useSelector } from "react-redux";

import MessageImage from "../MessageImage/MessageImage";

import {
  getDayInYear,
  getTimeInDay,
} from "../../../../../utils/dateConfigs/format";

import { currentMessageSlice } from "../../../../../redux/messageSlice";

import { ReplyMessageSVG2 } from "../../../../../utils/svgConfigs/SVG";

import styles from "./ReplyMessage.module.css";

function ReplyMessage({ message }) {
  const params = useParams();
  const currentMessages = useSelector(
    (state) => state[currentMessageSlice.name]
  );

  if (message === null) {
    return <></>;
  }
  if (
    message.deleted === true ||
    currentMessages.find(
      (currentMessage) => currentMessage._id === message._id
    ) === undefined
  ) {
    return (
      <div className={styles.rootContainer}>
        <p className={styles.deletedText}>Replied message get deleted</p>
      </div>
    );
  }
  const { senderId, receiverName, text, images, imagesUrl, createdAt } =
    message;

  return (
    <div className={styles.rootContainer}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <ReplyMessageSVG2 />
          <p>
            Replying message from{" "}
            {senderId === params.userid ? "you" : receiverName}
          </p>
        </div>
        <div className={styles.time}>
          <p>
            {getDayInYear(new Date(Number(createdAt)))} -{" "}
            {getTimeInDay(createdAt)}
          </p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <p>{text}</p>
      </div>
      {images.length > 0 && (
        <MessageImage images={images} imagesUrl={imagesUrl} />
      )}
    </div>
  );
}

export default ReplyMessage;
