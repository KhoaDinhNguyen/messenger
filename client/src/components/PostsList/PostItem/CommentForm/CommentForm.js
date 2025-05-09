import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import EmojiPicker from "emoji-picker-react";

import InputTextArea from "../../../Utils/InputTextArea/InputTextArea";
import InputButton from "../../../Utils/InputButton/InputButton";
import InputFile from "../../../Utils/InputFile/InputFile";

import {
  profileImageFileURLSlice,
  nameSlice,
} from "../../../../redux/userSlice";

import {
  SendSVG,
  EmojiSVG,
  UploadImageSVG,
} from "../../../../utils/svgConfigs/SVG";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./CommentForm.module.css";

function CommentForm({ postId }) {
  const params = useParams();
  const [comment, setComment] = useState("");
  const [visileEmoji, setVisibleEmoji] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [textAreaNumRows, setTextAreaNumRows] = useState(1);
  const creatorName = useSelector((state) => state[nameSlice.name]);
  const formRef = useRef(null);
  const userImage = useSelector(
    (state) => state[profileImageFileURLSlice.name]
  );

  const onChangeComment = (event) => {
    setComment((text) => event.target.value);
    const wordBreak = event.target.value.split("\n");
    const maxLength = 42;
    //TODO: hard code
    let newNumRows = 0;
    for (const words of wordBreak) {
      const numRowsNeed =
        words.length % maxLength === 0
          ? words.length / maxLength
          : Math.floor(words.length / maxLength) + 1;

      if (words.length === 0) {
        newNumRows += 1;
      } else {
        newNumRows += numRowsNeed;
      }
    }

    setTextAreaNumRows(newNumRows);
  };

  const onClickEmoji = (emoji) => {
    setComment((text) => text + emoji.emoji);
    setVisibleEmoji(false);
  };
  const onClickVisibleEmoji = () => {
    setVisibleEmoji((state) => !state);
  };
  const onKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      if (formRef.current) {
        // alert(formRef.current);
        // formRef.current.submit();
      }
    }
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    const graphQLQuery = {
      query: `
        mutation createCommentFromPost($postId: String!, $creatorId: String!, $creatorName: String, $text: String){
          createCommentFromPost(postInput: {
            postId: $postId
            creatorId: $creatorId
            creatorName: $creatorName
            text: $text
          }) {
            creatorName
            text
          }
        }
      `,
      variables: {
        postId: postId,
        creatorId: params.userid,
        creatorName: creatorName,
        text: comment,
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
        if (response.data === null) {
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setComment((text) => "");
    setTextAreaNumRows(1);
  };

  const onChangeFocus = (isFocus) => {
    setHasFocus(isFocus);
  };
  //TODO: onBlur has problems
  return (
    <div className={styles.rootContainer}>
      <div className={styles.userImageContainer}>
        <img
          src={userImage && userImage !== "" ? userImage : userpublic}
          alt="user"
          className={styles.userImage}
        />
      </div>
      <div
        className={`${styles.commentFormContainer} ${
          hasFocus ? styles.focusForm : ""
        }`}
        tabIndex="1"
        onFocus={onChangeFocus.bind(null, true)}
        onBlur={onChangeFocus.bind(null, false)}
      >
        <form
          className={styles.commentForm}
          onSubmit={onSubmitForm}
          ref={formRef}
        >
          <InputTextArea
            id={"comment"}
            rootContainer={styles.commentContainer}
            inputContainer={styles.commentInput}
            placeholder={"Comment this post..."}
            valueText={comment}
            onChangeText={onChangeComment}
            onKeyDown={onKeyDown}
            required={true}
            row={textAreaNumRows}
          />
          <div className={styles.buttonsContainer}>
            <div className={styles.commentFeaturesContainer}>
              <div className={styles.emojiButton} onClick={onClickVisibleEmoji}>
                <EmojiSVG />
              </div>
              {visileEmoji && (
                <div className={styles.emojiPickerContainer}>
                  <div className={styles.emojiPicker}>
                    <EmojiPicker
                      emojiStyle="native"
                      onEmojiClick={onClickEmoji}
                    />
                  </div>
                </div>
              )}
              <div className={styles.imageButton}>
                <InputFile
                  id="commentImages"
                  labelText={<UploadImageSVG />}
                  inputContainer={styles.imageInput}
                  labelContainer={styles.imageLabel}
                  rootContainer={styles.imageContainer}
                  accept={".jpg, .jpeg, .png"}
                  mutiple={true}
                />
              </div>
            </div>
            <InputButton
              id="submitComment"
              type={"submit"}
              inputContainer={styles.submitInput}
              labelContainer={styles.submitLabel}
              rootContainer={styles.submitContainer}
              labelText={<SendSVG />}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
