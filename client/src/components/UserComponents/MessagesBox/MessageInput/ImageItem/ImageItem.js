import styles from "./ImageItem.module.css";

import InputButton from "../../../../Utils/InputButton/InputButton";

function ImageItem({ url, fileName, onClickDeleteImage }) {
  return (
    <div className={styles.rootContainer}>
      <InputButton
        type="button"
        valueButton={""}
        labelText={"X"}
        id={`delete_${fileName}`}
        rootContainer={styles.deleteButton}
        inputContainer={styles.deleteInput}
        labelContainer={styles.deleteLabel}
        onClickHandler={onClickDeleteImage.bind(null, url, fileName)}
      />
      <img src={url} alt={fileName} className={styles.image} />
    </div>
  );
}

export default ImageItem;
