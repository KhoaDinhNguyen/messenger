import Modal from "../../../Utils/Modal/Modal/Modal";

import styles from "./ClipBoardModal.module.css";

function ClipBoardModal({ visible, message }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <p className={styles.title}>{message}</p>
      </div>
    </Modal>
  );
}

export default ClipBoardModal;
