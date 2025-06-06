import { useParams, useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";

import {
  currentSenderSlice,
  currentMessageSlice,
} from "../../../../redux/messageSlice";

import MessageImage from "./MessageImage/MessageImage";
import MessageUpdateInput from "./MessageUpdateInput/MessageUpdateInput";
import ReplyMessage from "./ReplyMessage/ReplyMessage";

import {
  EmojiSVG,
  DotMenuSVG,
  ReplyMessageSVG,
} from "../../../../utils/svgConfigs/SVG";

import {
  getTimeInDay,
  getDayInYear,
} from "../../../../utils/dateConfigs/format";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./MessageItem.module.css";

function MessageItem({
  message,
  setReplyMessage,
  onClickOpenPermantDeleteModal,
  onClickOpenLocalDeleteModal,
}) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const currId = params.userid;
  const {
    receiverId,
    receiverName,
    text,
    senderEmoji,
    receiverEmoji,
    createdAt,
    images,
    imagesUrl,
    replyOf,
    senderId,
    senderName,
    updatedAt,
  } = message;

  const friendImage = searchParams.get("friendImage");
  const sender = useSelector((state) => state[currentSenderSlice.name]);
  const [visiblePicker, setVisiblePicker] = useState(false);
  const [visibleMore, setVisibleMore] = useState(false);
  const [replyOfMessage, setReplyOfMessage] = useState(null);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const diffTimeCreatedAt =
    new Date().getTime() - new Date(Number(createdAt)).getTime();

  useEffect(() => {
    if (replyOf !== null) {
      const graphQLQuery = {
        query: `query GetMessageById($messageId: String!){
          getMessageById(messageInput:{messageId: $messageId}) {
            text
            senderId
            senderName
            receiverId
            receiverName
            images
            imagesUrl
            createdAt
            _id
          }
        }`,
        variables: {
          messageId: replyOf,
        },
      };

      const bodyJSON = JSON.stringify(graphQLQuery);
      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");

      fetch(process.env.REACT_APP_SERVER_API, {
        method: "POST",
        body: bodyJSON,
        headers: myHeaders,
      })
        .then((jsonResponse) => jsonResponse.json())
        .then((response) => {
          if (response.data.getMessageById === null) {
            const errorMessages = response.errors.map((error) => error.message);
            if (
              errorMessages.includes(
                "Cannot read properties of null (reading 'images')"
              )
            ) {
              setReplyOfMessage({ deleted: true });
            }
          } else {
            setReplyOfMessage(response.data.getMessageById);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [replyOf]);

  const onChangeVisiblePicker = () => {
    setVisiblePicker((state) => !state);
  };

  const onChangeVisibleMore = () => {
    setVisibleMore((prevState) => !prevState);
  };

  const onClickReplyMessage = () => {
    setReplyMessage((prevState) => message);
  };

  const onClickOpenEditMessage = () => {
    setVisibleEdit((prevState) => true);
  };

  const onClickCloseEditMessage = () => {
    setVisibleEdit((prevState) => false);
  };
  const onClickEmoji = (emoji) => {
    const graphQLQuery = {
      query: `
        mutation UpdateMessageEmoji(
          $messageId: String!
          $emoji: String
          $commentId: String!
        ){
          updateMessageEmoji(messageInput:{
            messageId: $messageId, 
            emoji: $emoji
            commentId: $commentId

          }) {
            _id
          }
        }
        `,
      variables: {
        messageId: message._id,
        emoji: emoji.emoji !== senderEmoji ? emoji.emoji : "",
        commentId: params.userid,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    fetch(process.env.REACT_APP_SERVER_API, {
      method: "POST",
      body: bodyJSON,
      headers: myHeaders,
    })
      .then((jsonResponse) => jsonResponse.json())
      .then((response) => {
        if (response.data !== null) {
          dispatch(
            currentMessageSlice.actions.updateEmoji({
              messageId: response.data.updateMessageEmoji._id,
              emoji: emoji.emoji,
              commentId: params.userid,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setVisiblePicker(false);
  };
  if (sender === null) {
    return <></>;
  }
  // if (receiverId !== senderId) this message belongs to current page user

  const currentUserImage =
    sender.friendImageURL && sender.friendImageURL !== ""
      ? sender.friendImageURL
      : userpublic;

  const receiverImg =
    friendImage !== "undefined" && friendImage !== "null" && friendImage !== ""
      ? friendImage
      : userpublic;
  const isCurrentPage =
    receiverId !== currId || message.senderId === message.receiverId;

  const emojiArray = [];
  let emojiLength = 0;
  const hasSenderEmoji = senderEmoji !== null && senderEmoji !== "";
  const hasReceiverEmoji = receiverEmoji !== null && receiverEmoji !== "";

  if (hasSenderEmoji) {
    emojiArray.push(senderEmoji);
    emojiLength++;
  }
  if (hasReceiverEmoji) {
    emojiArray.push(receiverEmoji);
    emojiLength++;
  }

  if (receiverEmoji === senderEmoji) {
    emojiArray.pop();
  }

  const emojiesRender = emojiArray.map((emoji) => {
    return (
      <p className={styles.emoji} key={`${emoji}_${message._id}`}>
        {emoji}
      </p>
    );
  });

  const rootContainer = `${
    isCurrentPage ? styles.senderRootContainer : styles.receiverRootContainer
  } ${styles.rootContainer}`;

  const messageContainer = isCurrentPage
    ? styles.senderMessage
    : styles.receiverMessage;

  const textContainer = isCurrentPage ? styles.senderText : styles.receiverText;

  return (
    <div className={rootContainer}>
      <div
        className={
          isCurrentPage ? styles.senderContainer : styles.receiverContainer
        }
      >
        <div className={styles.imageContainer}>
          <img
            src={isCurrentPage ? currentUserImage : receiverImg}
            alt="user"
            className={styles.image}
          />
        </div>
        {!visibleEdit && (
          <>
            <div className={messageContainer}>
              {replyOfMessage !== null && (
                <div className={styles.replyOfContainer}>
                  <ReplyMessage message={replyOfMessage} />
                </div>
              )}

              <div className={textContainer}>
                {images.length > 0 && (
                  <MessageImage images={images} imagesUrl={imagesUrl} />
                )}
                <div>
                  <p className={styles.text}>{text}</p>
                </div>
                {emojiArray.length > 0 && (
                  <div className={styles.emojiContainer}>
                    <div className={styles.emojiText}>
                      {emojiesRender}
                      <p className={styles.emojiLength}>{emojiLength}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <div
                className={styles.dotMenuContainer}
                onClick={onChangeVisibleMore}
              >
                <div title="More">
                  <DotMenuSVG />
                </div>
                {visibleMore && (
                  <div className={styles.dropListMoreContainer}>
                    <div className={styles.dropListMoreSubContainer}>
                      <div className={styles.listMoreContainer}>
                        <ul className={styles.listMore}>
                          {senderId === currId && (
                            <>
                              <li
                                onClick={onClickOpenPermantDeleteModal.bind(
                                  this,
                                  message
                                )}
                              >
                                Delete permanently
                              </li>
                            </>
                          )}

                          <li
                            onClick={onClickOpenLocalDeleteModal.bind(
                              this,
                              message
                            )}
                          >
                            Delete locally
                          </li>
                          {senderId === currId &&
                            diffTimeCreatedAt <= 300000 && (
                              <>
                                <li onClick={onClickOpenEditMessage}>Edit</li>
                              </>
                            )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={styles.replyMessageContainer}
                onClick={onClickReplyMessage}
                title="Reply"
              >
                <ReplyMessageSVG />
              </div>
              <div
                className={styles.emojiButtonContainer}
                onClick={onChangeVisiblePicker}
                title="Emoji"
              >
                <EmojiSVG />
              </div>
              <div className={styles.emojiPickerRoot}>
                <div className={styles.emojiPickerContainer}>
                  <Picker
                    reactions={["1f496", "1f44d", "1f602", "1f62d", "1f621"]}
                    reactionsDefaultOpen={true}
                    open={visiblePicker}
                    emojiStyle="native"
                    onEmojiClick={onClickEmoji}
                    allowExpandReactions={false}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {!visibleEdit && (
        <div className={styles.messageTime}>
          <p className={styles.timeText}>
            {createdAt === updatedAt
              ? getTimeInDay(createdAt)
              : `\u270E ${getDayInYear(
                  new Date(Number(updatedAt))
                )} - ${getTimeInDay(updatedAt)}`}
          </p>
        </div>
      )}
      {visibleEdit && (
        <div className={styles.updatedMessageContainer}>
          <MessageUpdateInput
            message={message}
            onClickCloseHandler={onClickCloseEditMessage}
          />
        </div>
      )}
    </div>
  );
}

export default MessageItem;
