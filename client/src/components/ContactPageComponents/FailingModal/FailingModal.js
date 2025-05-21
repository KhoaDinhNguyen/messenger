import Modal from "../../Utils/Modal/Modal/Modal";
import InputButton from "../../Utils/InputButton/InputButton";

import { ErrorContactSVG } from "../../../utils/svgConfigs/SVG";

import styles from "./FailingModal.module.css";

function FailingModal({ visible, message, onClickCloseModal }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <div className={styles.svgContainer}>
          <ErrorContactSVG />
          <p className={styles.svgText}>Oh no!</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.title}>{message}</p>
        </div>

        <InputButton
          id={"closeFailingModal"}
          type={"button"}
          valueButton={""}
          labelText={<p className={styles.labelText}>Close</p>}
          inputContainer={styles.closeInput}
          labelContainer={styles.closeLabel}
          rootContainer={styles.closeButton}
          onClickHandler={onClickCloseModal}
        />
      </div>
    </Modal>
  );
}

export default FailingModal;
