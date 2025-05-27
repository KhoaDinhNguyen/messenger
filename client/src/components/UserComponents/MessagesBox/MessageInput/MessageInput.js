import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";

import InputButton from "../../../Utils/InputButton/InputButton";
import InputFile from "../../../Utils/InputFile/InputFile";
import InputTextArea from "../../../Utils/InputTextArea/InputTextArea";
import InputText from "../../../Utils/InputText/InputText";
import ImageList from "./ImageList/ImageList";
import ReplyMessage from "./ReplyMessage/ReplyMessage";

import { getRandomString } from "../../../../utils/fileConfigs/format";

import { EmojiSVG, UploadImageSVG } from "../../../../utils/svgConfigs/SVG";

import { nameSlice } from "../../../../redux/userSlice";
import {
  currentMessageSlice,
  latestMessageSlice,
} from "../../../../redux/messageSlice";

import sendMessage from "../../../../asset/img/send.png";
import styles from "./MessageInput.module.css";

const validFileTypes = ["image/png", "image/jpeg", "image/png"];

function MessageInput({ searchParams, replyMessage, setReplyMessage }) {
  const params = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);
  const [visiblePicker, setVisiblePicker] = useState(false);
  const senderId = params.userid;
  const senderName = useSelector((state) => state[nameSlice.name]);
  const receiverId = searchParams.get("friendId");
  const receiverName = searchParams.get("friendName");

  useEffect(() => {
    setText("");
    setRenderedImages([]);
    setStoredImages([]);
    setVisiblePicker(false);
  }, [receiverId]);

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

  const onChangeDeleteImage = (fileUrl, fileName) => {
    setStoredImages((state) =>
      state.filter((image) => image.name !== fileName)
    );
    setRenderedImages((state) =>
      state.filter((image) => image.url !== fileUrl)
    );
  };
  const onChangeInsertImage = (event) => {
    const newImageUrl = [];
    const newFiles = event.target.files;
    const selectedFiles = [];

    for (const originalFile of newFiles) {
      const newFileName = `${getRandomString(32)}_${originalFile.name}`;
      const newFile = new File([originalFile], newFileName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });

      newImageUrl.push({
        url: URL.createObjectURL(newFile),
        fileName: newFile.name,
      });
      selectedFiles.push(newFile);
    }

    setRenderedImages((prevFiles) => [...prevFiles, ...newImageUrl]);
    setStoredImages((prevFiles) => [...prevFiles, ...selectedFiles]);
    event.target.value = "";
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (receiverId !== null) {
      let images = [];
      if (storedImages.length > 0) {
        const failedImage = storedImages.filter((file) => {
          return !(file && validFileTypes.find((type) => (type = file.type)));
        });

        if (failedImage.length === 0) {
          const formData = new FormData();
          const myHeaders = new Headers();
          for (const file of storedImages) {
            formData.append("images", file);
          }
          formData.append("userid", params.userid);
          myHeaders.append(
            "Content-Type",
            `multipart/form-data; boundary=${process.env.REACT_APP_BOUNDARY}`
          );

          const jsonResponseUploadAWS = await fetch(
            process.env.REACT_APP_UPLOAD_IMAGES,
            {
              method: "POST",
              body: formData,
            }
          );
          const responseImage = await jsonResponseUploadAWS.json();
          images = responseImage.files.map((file) => {
            return file.fileName;
          });
          if (jsonResponseUploadAWS.ok) {
            //sendMessage
          } else {
            throw new Error("Cannot upload images");
          }
        }
      }

      const graphQLQuery = {
        query: `
        mutation CreateMessage($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!, $text: String!, $images: [String], $replyOf: String){
          createMessage(messageInput:{
            senderId: $senderId
            senderName: $senderName
            receiverId: $receiverId
            receiverName: $receiverName
            text: $text
            images: $images
            replyOf: $replyOf
          }) {
            _id
            senderId
            senderName
            receiverId
            receiverName
            text
            createdAt
            updatedAt
            senderEmoji
            receiverEmoji
            images
            imagesUrl
            replyOf
          }
        }
        `,
        variables: {
          senderId: senderId,
          senderName: senderName,
          receiverId: receiverId,
          receiverName: receiverName,
          text: text,
          images: images,
          replyOf: replyMessage !== null ? replyMessage._id : null,
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
              currentMessageSlice.actions.addMessage(
                response.data.createMessage
              )
            );
            dispatch(
              latestMessageSlice.actions.addMessage(response.data.createMessage)
            );
            setReplyMessage(null);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Do not have receiver");
    }
    setText("");
    setRenderedImages([]);
    setStoredImages([]);
  };

  const imageButton = (
    <img src={sendMessage} alt="Send" className={styles.image} />
  );

  return (
    <div className={styles.rootContainer}>
      <form className={styles.formContainer} onSubmit={onSubmitForm}>
        <InputFile
          id={"uploadImages"}
          accept={".jpg, .jpeg, .png"}
          labelText={
            <div className={styles.uploadImageContainer}>
              <UploadImageSVG />
            </div>
          }
          inputContainer={styles.fileInput}
          labelContainer={styles.fileLabel}
          rootContainer={styles.imageUploadContainer}
          mutiple={true}
          onChangeFile={onChangeInsertImage}
        />
        <div className={styles.messageInputContainer}>
          <div>
            <ReplyMessage
              message={replyMessage}
              setReplyMessage={setReplyMessage}
            />
          </div>
          <div className={styles.messageInputText}>
            <div>
              <div>
                {renderedImages.length > 0 && (
                  <ImageList
                    images={renderedImages}
                    onClickDeleteImage={onChangeDeleteImage}
                  />
                )}
              </div>
              <InputText
                id={"messageInput"}
                rootContainer={styles.messageContainer}
                inputContainer={styles.messageInput}
                valueText={text}
                onChangeText={onChangeText}
                placeholder={"Type a message"}
              />
            </div>

            <div
              className={`${styles.emojiButtonContainer} ${
                visiblePicker ? styles.emojiButtonContainerFocus : ""
              }`}
              onClick={onChangeVisiblePicker}
            >
              <EmojiSVG />
            </div>
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
