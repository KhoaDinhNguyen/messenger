import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router";

import Modal from "../../../Utils/Modal/Modal/Modal";
import InputButton from "../../../Utils/InputButton/InputButton";
import InputText from "../../../Utils/InputText/InputText";
import InputTextArea from "../../../Utils/InputTextArea/InputTextArea";
import InputFile from "../../../Utils/InputFile/InputFile";
import InputSelect from "../../../Utils/InputSelect/InputSelect";
import ImageList from "./ImageList/ImageList";

import { getRandomString } from "../../../../utils/fileConfigs/format";

import {
  nameSlice,
  profileImageFileNameSlice,
  profileImageFileURLSlice,
} from "../../../../redux/userSlice";

import {
  CloseModalSVG,
  UploadImageSVG,
  EmojiSVG,
} from "../../../../utils/svgConfigs/SVG";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./CreatePostModal.module.css";
import EmojiPicker from "emoji-picker-react";

const validFileTypes = ["image/png", "image/jpeg", "image/png"];

function CreatePostModal({ createPostModal, onClickClosePostModal }) {
  const params = useParams();
  const name = useSelector((state) => state[nameSlice.name]);
  const imageUrl = useSelector((state) => state[profileImageFileURLSlice.name]);
  const userImage = useSelector(
    (state) => state[profileImageFileNameSlice.name]
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modifiers, setModifers] = useState("Friends");
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);
  const [visibleEmoji, setVisibleEmoji] = useState(false);
  const [textFocus, setTextFocus] = useState(undefined);

  const onFocusText = (event) => {
    setTextFocus(event.target.id);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onChangeModifiers = (event) => {
    setModifers(event.target.value);
  };

  const onChangeVisibleEmoji = () => {
    setVisibleEmoji((state) => !state);
  };

  const onClickEmoji = (emoji) => {
    if (textFocus === "postTitle") {
      setTitle((prevContent) => prevContent + emoji.emoji);
    } else {
      setContent((prevContent) => prevContent + emoji.emoji);
    }
    setVisibleEmoji(false);
  };
  const onClickRemoveImage = (fileName) => {
    setRenderedImages((prevFiles) =>
      prevFiles.filter((image) => image.fileName !== fileName)
    );
    setStoredImages((prevFiles) =>
      prevFiles.filter((image) => image.name !== fileName)
    );
  };

  const onChangeImages = (event) => {
    const newFiles = event.target.files;
    const newImagesUrl = [];
    const selectedFiles = [];

    for (const originalFile of newFiles) {
      const newFileName = `${getRandomString(32)}_${originalFile.name}`;
      const newFile = new File([originalFile], newFileName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });

      newImagesUrl.push({
        url: URL.createObjectURL(newFile),
        fileName: newFile.name,
      });

      selectedFiles.push(newFile);
    }

    setRenderedImages((prevFiles) => [...prevFiles, ...newImagesUrl]);
    setStoredImages((prevFiles) => [...prevFiles, ...selectedFiles]);
    event.target.value = "";
  };
  const onSubmitCreatePost = async (event) => {
    event.preventDefault();
    console.log(content);
    let images = []; // store images URL
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
        mutation CreatePost(
          $creatorId: String!,
          $creatorName: String!,
          $title: String,
          $content: String!,
          $modifiers: String!, 
          $images: [String],
          $creatorImage: String
        ) {
          createPost(postInput:{
            creatorId: $creatorId
            creatorName: $creatorName
            modifiers: $modifiers
            title: $title
            content: $content
            images: $images
            creatorImage: $creatorImage
          }) {
            creatorId
            creatorName
            creatorImage
            creatorImageUrl
            title
            content
            modifiers
            images
            imagesUrl
          }
        }
      `,
      variables: {
        creatorId: params.userid,
        creatorName: name,
        creatorImage: userImage,
        modifiers: modifiers,
        title: title,
        content: content,
        images: images,
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
      .then((reponse) => {
        console.log(reponse);
        if (reponse.data === null) {
          //TODO: handle error
        } else {
          console.log(reponse.data);
        }
      });

    setContent("");
    setTitle("");
    setRenderedImages([]);
    setStoredImages([]);
    onClickClosePostModal();
  };

  const closeButton = (
    <div className={styles.closeSVG}>
      <CloseModalSVG />
    </div>
  );

  return (
    <div>
      <Modal visible={createPostModal} overrideStyle={styles.modalContainer}>
        <div className={styles.formContainer}>
          <form onSubmit={onSubmitCreatePost}>
            <div className={styles.formHeaderContainer}>
              <div className={styles.formTitleContainer}>
                <p className={styles.formTitle}>Share your story</p>
              </div>
              <InputButton
                id={"closePostModal"}
                type={"button"}
                labelText={closeButton}
                valueButton={""}
                onClickHandler={onClickClosePostModal}
                inputContainer={styles.closeInput}
                labelContainer={styles.closeLabel}
                rootContainer={styles.closeContainer}
              />
            </div>
            <div className={styles.modifiersContainer}>
              <div className={styles.creatorContainer}>
                <img
                  src={imageUrl === "" ? userpublic : imageUrl}
                  name="user"
                  className={styles.userImage}
                />
                <p className={styles.name}>{name}</p>
              </div>
              <InputSelect
                id={"modifiers"}
                optionList={["Public", "Friends", "Private"]}
                selectContainer={styles.selectStyles}
                optionContainer={styles.optionStyles}
                valueOption={modifiers}
                onChangeOption={onChangeModifiers}
              />
            </div>
            <InputText
              id="postTitle"
              placeholder={"Title"}
              rootContainer={styles.titleContainer}
              inputContainer={styles.titleInput}
              onChangeText={onChangeTitle}
              valueText={title}
              onFocusText={onFocusText}
            />
            <InputTextArea
              id="postContent"
              placeholder={"Type your feeling..."}
              rootContainer={styles.contentContainer}
              inputContainer={styles.contentInput}
              onChangeText={onChangeContent}
              valueText={content}
              required={true}
              onFocusText={onFocusText}
            />
            <div className={styles.contentFeaturesContainer}>
              <div
                className={styles.postEmojiContainer}
                onClick={onChangeVisibleEmoji}
              >
                <EmojiSVG />
                {visibleEmoji && (
                  <div className={styles.emojiContainer}>
                    <div className={styles.emojiPicker}>
                      <EmojiPicker
                        onEmojiClick={onClickEmoji}
                        emojiStyle="native"
                      />
                    </div>
                  </div>
                )}
              </div>
              <InputFile
                id="createPostImage"
                labelText={<UploadImageSVG />}
                inputContainer={styles.postImageInput}
                labelContainer={styles.postImageLabel}
                onChangeFile={onChangeImages}
                accept={".jpg, .jpeg, .png"}
                mutiple={true}
              />
            </div>
            <div>
              <ImageList
                images={renderedImages}
                imageStyle={styles.imageStyle}
                listStyle={styles.listImage}
                removeLabel={"Close"}
                onClickRemoveImage={onClickRemoveImage}
              />
            </div>
            <InputButton
              id={"submitCreatePostForm"}
              type={"submit"}
              valueButton={"Posts"}
              inputContainer={styles.submitInput}
              rootContainer={styles.submitContainer}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CreatePostModal;
