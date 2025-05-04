import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import InputFile from "../../../Utils/InputFile/InputFile";

import {
  profileImageFileNameSlice,
  profileImageFileURLSlice,
} from "../../../../redux/userSlice";

import userpublic from "../../../../asset/img/userpublic.png";
import uploadfile from "../../../../asset/img/uploadfile.png";

import styles from "./UserImage.module.css";

const validFileTypes = ["image/png", "image/jpeg", "image/png"];

function UserImage() {
  const params = useParams();
  const dispatch = useDispatch();
  const imageFileURL = useSelector(
    (state) => state[profileImageFileURLSlice.name]
  );

  const onChangeImage = async (event) => {
    const newImage = event.target.files[0];
    if (newImage && validFileTypes.find((type) => type === newImage.type)) {
      const formData = new FormData();
      const myHeaders = new Headers();

      formData.append("image", newImage);
      formData.append("userid", params.userid);
      myHeaders.append(
        "Content-Type",
        `multipart/form-data; boundary=${process.env.REACT_APP_BOUNDARY}`
      );

      try {
        const jsonResponseUploadAWS = await fetch(
          process.env.REACT_APP_UPLOAD_IMAGE,
          {
            method: "POST",
            body: formData,
          }
        );

        const responseUploadAWS = await jsonResponseUploadAWS.json();

        if (jsonResponseUploadAWS.ok) {
          const graphQLQuery = {
            query: `
              mutation UpdateUser($userid: String!, $profileImageName: String){
                updateUser(userInput:{
                  id: $userid
                  profileImageName: $profileImageName
                }) {
                  _id
                  profileImageName
                  profileImageURL
                }
              }
            `,
            variables: {
              userid: params.userid,
              profileImageName: responseUploadAWS.fileName,
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
              dispatch(
                profileImageFileNameSlice.actions.init(
                  response.data.updateUser.profileImageName
                )
              );
              dispatch(
                profileImageFileURLSlice.actions.init(
                  response.data.updateUser.profileImageURL
                )
              );
            })
            .catch((err) => {
              throw err;
            });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // TODO: Handle error
    }
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.imageContainer}>
        <img
          src={
            imageFileURL !== "" && imageFileURL !== null
              ? imageFileURL
              : userpublic
          }
          alt="user"
          className={styles.image}
        />
      </div>
      <div className={styles.updateImage}>
        <InputFile
          id={"newUserImage"}
          accept={".jpg, .jpeg, .png"}
          required={true}
          labelText={
            <div className={styles.uploadImageContainer}>
              <img
                src={uploadfile}
                alt="Upload file"
                className={styles.uploadImage}
              />
            </div>
          }
          inputContainer={styles.fileInput}
          labelContainer={styles.fileLabel}
          onChangeFile={onChangeImage}
        />
      </div>
    </div>
  );
}

export default UserImage;
