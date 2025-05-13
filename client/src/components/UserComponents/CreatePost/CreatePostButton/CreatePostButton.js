import InputButton from "../../../Utils/InputButton/InputButton";

import styles from "./CreatePostButton.module.css";

function CreatePostButton({ onClickOpenCreatePostModal }) {
  return (
    <div>
      <InputButton
        id={"creatPost"}
        type={"button"}
        labelText={"Share your day"}
        onClickHandler={onClickOpenCreatePostModal}
        inputContainer={styles.createPostInput}
        labelContainer={styles.createPostLabel}
        rootContainer={styles.createPostButton}
      />
    </div>
  );
}

export default CreatePostButton;
