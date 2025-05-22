import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router";

import MessageDate from "../MessageDate/MessageDate";
import InputButton from "../../../Utils/InputButton/InputButton";

import {
  currentMessageSlice,
  currentSenderSlice,
  latestMessageSlice,
} from "../../../../redux/messageSlice";
import { getMessageByDates } from "../../../../utils/messageConfigs/getMessageByDates";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./MessageList.module.css";

function MessageList({ setReplyMessage }) {
  const dispatch = useDispatch();
  const messagesList = useSelector((state) => state[currentMessageSlice.name]);
  const sender = useSelector((state) => state[currentSenderSlice.name]);

  const [searchParams] = useSearchParams();

  if (messagesList.length === 0) {
    const friendImage = searchParams.get("friendImage");
    const friendName = searchParams.get("friendName");
    const friendId = searchParams.get("friendId");
    const friendImageSrc =
      friendImage !== "undefined" &&
      friendImage !== "null" &&
      friendImage !== ""
        ? friendImage
        : userpublic;

    const onClickSendFirstMessage = (message) => {
      if (friendId !== null) {
        const graphQLQuery = {
          query: `
          mutation CreateMessage($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!, $text: String!, $images: [String]){
          createMessage(messageInput:{
            senderId: $senderId
            senderName: $senderName
            receiverId: $receiverId
            receiverName: $receiverName
            text: $text
            images: $images
          }) {
            _id
            senderId
            senderName
            receiverId
            receiverName
            text
            createdAt
            senderEmoji
            receiverEmoji
            images
            imagesUrl
          }
        }
          `,
          variables: {
            senderId: sender.friendId,
            senderName: sender.friendName,
            receiverId: friendId,
            receiverName: friendName,
            text: message,
            images: [],
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
            if (response.data.createMessage !== null) {
              dispatch(
                currentMessageSlice.actions.addMessage(
                  response.data.createMessage
                )
              );
              dispatch(
                latestMessageSlice.actions.addMessage(
                  response.data.createMessage
                )
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Do not have receiver");
      }
    };
    return (
      <div className={styles.noMessageContainer}>
        <div className={styles.newFriendContainer}>
          <p className={styles.newFriendTitle}>New friend</p>
          <div className={styles.friendImageContainer}>
            <img src={friendImageSrc} alt="user" className={styles.image} />
            <p className={styles.friendName}>{friendName}</p>
          </div>
          <p>Send your friend first message</p>
        </div>
        <div className={styles.noMessageButtonContainers}>
          <InputButton
            id={"firstMessage_Hello"}
            type="button"
            valueButton={""}
            labelText={"Hello 👋"}
            onClickHandler={onClickSendFirstMessage.bind(null, "Hello 👋")}
            labelContainer={styles.buttonLabel}
            inputContainer={styles.buttonInput}
            rootContainer={styles.buttonContainer}
          />
          <InputButton
            id={"firstMessage_Hi"}
            type="button"
            valueButton={""}
            labelText={"Hi 😁"}
            labelContainer={styles.buttonLabel}
            inputContainer={styles.buttonInput}
            rootContainer={styles.buttonContainer}
            onClickHandler={onClickSendFirstMessage.bind(null, "Hi 😁")}
          />
        </div>
      </div>
    );
  }
  const messagesDates = getMessageByDates(messagesList);

  const messagesDateListRender = messagesDates.map((messageDate) => {
    return (
      <li key={messageDate.date}>
        <MessageDate
          date={messageDate.date}
          messagesList={messageDate.messages}
          setReplyMessage={setReplyMessage}
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
