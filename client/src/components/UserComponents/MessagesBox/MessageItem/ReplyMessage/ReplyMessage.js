import { useParams } from "react-router";

import MessageImage from "../MessageImage/MessageImage";

import {
  getDayInYear,
  getTimeInDay,
} from "../../../../../utils/dateConfigs/format";

import { ReplyMessageSVG2 } from "../../../../../utils/svgConfigs/SVG";

import styles from "./ReplyMessage.module.css";

function ReplyMessage({ message }) {
  const params = useParams();

  if (message === null) {
    return <></>;
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
