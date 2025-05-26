import { useParams } from "react-router";

import InputButton from "../../../../Utils/InputButton/InputButton";
import MessageImage from "../../MessageItem/MessageImage/MessageImage";

import { ReplyMessageSVG2 } from "../../../../../utils/svgConfigs/SVG";

import {
  getDayInYear,
  getTimeInDay,
} from "../../../../../utils/dateConfigs/format";

import styles from "./ReplyMessage.module.css";

function ReplyMessage({ message, setReplyMessage }) {
  const params = useParams();
  if (message === null) {
    return <></>;
  }
  //TODO: imagesURL get expired
  const { senderId, text, senderName, createdAt, images, imagesUrl } = message;

  const onClickClearReplyMessage = () => {
    setReplyMessage((state) => null);
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <ReplyMessageSVG2 />
          <p>
            Replying message from{" "}
            {senderId === params.userid ? "you" : senderName}
          </p>
          <InputButton
            id={"clearReplyMessageButton"}
            type={"button"}
            valueButton={""}
            labelText={"x"}
            inputContainer={styles.closeInput}
            labelContainer={styles.closeLabel}
            rootContainer={styles.closeButton}
            onClickHandler={onClickClearReplyMessage}
          />
        </div>
        <div className={styles.time}>
          <p>
            {getDayInYear(new Date(Number(createdAt)))} -{" "}
            {getTimeInDay(createdAt)}
          </p>
        </div>
      </div>

      {text !== "" && (
        <div className={styles.textContainer}>
          <p>{text}</p>
        </div>
      )}

      {images.length > 0 && (
        <MessageImage images={images} imagesUrl={imagesUrl} />
      )}
    </div>
  );
}

export default ReplyMessage;
