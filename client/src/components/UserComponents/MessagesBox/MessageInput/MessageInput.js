import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

import InputText from "../../../../components/Utils/InputText/InputText";
import InputButton from "../../../Utils/InputButton/InputButton";

import { EmojiSVG } from "../../../../utils/svgConfigs/SVG";

import { nameSlice } from "../../../../redux/userSlice";
import {
  currentMessageSlice,
  latestMessageSlice,
} from "../../../../redux/messageSlice";

import sendMessage from "../../../../asset/img/send.png";

import styles from "./MessageInput.module.css";

function MessageInput({ searchParams }) {
  const params = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [visiblePicker, setVisiblePicker] = useState(false);
  const senderId = params.userid;
  const senderName = useSelector((state) => state[nameSlice.name]);
  const receiverId = searchParams.get("friendId");
  const receiverName = searchParams.get("friendName");

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const onClickEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.emoji);
    setVisiblePicker(false);
  };
  const onChangeVisiblePicker = () => {
    setVisiblePicker((state) => !state);
  };
  const onSubmitForm = (event) => {
    event.preventDefault();

    if (receiverId !== null) {
      const graphQLQuery = {
        query: `
        mutation CreateMessage($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!, $text: String!){
          createMessage(messageInput:{
            senderId: $senderId
            senderName: $senderName
            receiverId: $receiverId
            receiverName: $receiverName
            text: $text
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
          }
        }
        `,
        variables: {
          senderId: senderId,
          senderName: senderName,
          receiverId: receiverId,
          receiverName: receiverName,
          text: text,
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
          console.log(response);
          dispatch(
            currentMessageSlice.actions.addMessage(response.data.createMessage)
          );
          dispatch(
            latestMessageSlice.actions.addMessage(response.data.createMessage)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Do not have receiver");
    }
    setText("");
  };

  const imageButton = (
    <img src={sendMessage} alt="Send" className={styles.image} />
  );

  return (
    <div className={styles.rootContainer}>
      <form className={styles.formContainer} onSubmit={onSubmitForm}>
        <div className={styles.messageInputContainer}>
          <InputText
            id={"messageInput"}
            rootContainer={styles.messageContainer}
            inputContainer={styles.messageInput}
            valueText={text}
            onChangeText={onChangeText}
          />
          <div
            className={`${styles.emojiButtonContainer} ${
              visiblePicker ? styles.emojiButtonContainerFocus : ""
            }`}
            onClick={onChangeVisiblePicker}
          >
            <EmojiSVG />
          </div>
        </div>
        {visiblePicker && (
          <div className={styles.emojiRoot}>
            <div className={styles.emojiPicker}>
              <EmojiPicker onEmojiClick={onClickEmoji} emojiStyle="native" />
            </div>
          </div>
        )}
        <InputButton
          id={"sendMessage"}
          type={"submit"}
          labelText={imageButton}
          rootContainer={styles.submitButton}
          inputContainer={styles.submitInput}
          labelContainer={styles.submitLabel}
        />
      </form>
    </div>
  );
}

export default MessageInput;
