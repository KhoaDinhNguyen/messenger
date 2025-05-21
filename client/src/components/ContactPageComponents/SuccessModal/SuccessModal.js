import Modal from "../../Utils/Modal/Modal/Modal";

import styles from "./SuccessModal.module.css";

function SuccessModal({ visible, message }) {
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

export default SuccessModal;
