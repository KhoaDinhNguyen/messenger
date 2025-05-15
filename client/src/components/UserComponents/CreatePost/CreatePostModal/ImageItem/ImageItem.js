import InputButton from "../../../../Utils/InputButton/InputButton";

import styles from "./ImageItem.module.css";

function ImageItem({ url, fileName, onClickRemoveImage }) {
  return (
    <div className={styles.rootContainer}>
      <InputButton
        id={`delete_${fileName}`}
        type={"button"}
        onClickHandler={onClickRemoveImage.bind(null, fileName)}
        inputContainer={styles.buttonInput}
        labelText={"X"}
        labelContainer={styles.buttonLabel}
      />
      <a href={url} target="_blank" rel="noreferrer">
        <img src={url} alt={fileName} className={styles.image} />
      </a>
    </div>
  );
}

export default ImageItem;
