import { useSelector } from "react-redux";
import { useState } from "react";

import InputText from "../../../Utils/InputText/InputText";

import { profileImageFileURLSlice } from "../../../../redux/userSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./CommentForm.module.css";

function CommentForm() {
  const [comment, setComment] = useState("");

  const userImage = useSelector(
    (state) => state[profileImageFileURLSlice.name]
  );

  const onChangeComment = (event) => {
    setComment(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(comment);
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.userImageContainer}>
        <img
          src={userImage && userImage !== "" ? userImage : userpublic}
          alt="user"
          className={styles.userImage}
        />
      </div>
      <div className={styles.commentFormContainer}>
        <form className={styles.commentForm} onSubmit={onSubmitForm}>
          <InputText
            id={"comment"}
            rootContainer={styles.commentContainer}
            inputContainer={styles.commentInput}
            placeholder={"Comment this post..."}
            valueText={comment}
            onChangeText={onChangeComment}
          />
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
