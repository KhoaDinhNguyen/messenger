import { useState } from "react";
import { useDispatch } from "react-redux";

import InputTextArea from "../../../../Utils/InputTextArea/InputTextArea";
import InputButton from "../../../../Utils/InputButton/InputButton";

import { currentMessageSlice } from "../../../../../redux/messageSlice";

import {
  UploadImageSVG,
  EmojiSVG2,
  UpdateMessageCancelSVG,
  UpdateMessageSubmitSVG,
} from "../../../../../utils/svgConfigs/SVG";

import styles from "./MessageUpdateInput.module.css";

function MessageUpdateInput({ message, onClickCloseHandler }) {
  const { text, _id } = message;
  const dispatch = useDispatch();
  const [updatedText, setUpdatedText] = useState(text);
  const onChangeUpdatedText = (event) => {
    setUpdatedText(event.target.value);
  };

  const onClickSubmitForm = (event) => {
    event.preventDefault();
    const graphQLQuery = {
      query: `
        mutation UpdateMessageContent($messageId: String!, $text: String!, $images: [String], $replyOf: String){
          updateMessageContent(messageInput:{
            messageId: $messageId
            text: $text
            images: $images
            replyOf: $replyOf
          }) {
            text
            updatedAt
            images
            replyOf
          }
        }
      `,
      variables: {
        messageId: _id,
        text: updatedText,
        images: [],
        replyOf: null,
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
        if (response.data === undefined) {
        } else {
          const message = response.data.updateMessageContent;
          dispatch(
            currentMessageSlice.actions.updateContent({
              messageId: _id,
              text: message.text,
              images: message.images,
              replyOf: message.replyOf,
              updatedAt: message.updatedAt,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    onClickCloseHandler();
  };
  return (
    <div>
      <form onSubmit={onClickSubmitForm}>
        <InputTextArea
          id={`updatedMessage_${_id}`}
          valueText={updatedText}
          onChangeText={onChangeUpdatedText}
          inputContainer={styles.updatedTextInput}
          required={true}
        />
        <div className={styles.buttonContainers}>
          <div className={styles.updateTextButtons}>
            <div className={styles.emojiContainer}>
              <EmojiSVG2 />
            </div>
            <div>
              <UploadImageSVG />
            </div>
          </div>
          <div className={styles.controlFormButton}>
            <div
              onClick={onClickCloseHandler}
              className={styles.cancelButtonContainer}
            >
              <UpdateMessageCancelSVG />
            </div>
            <div>
              <InputButton
                id={`message_${_id}_updated`}
                type={"submit"}
                labelText={<UpdateMessageSubmitSVG />}
                inputContainer={styles.submitInput}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MessageUpdateInput;
