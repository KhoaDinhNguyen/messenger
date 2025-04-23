import Modal from "../../Utils/Modal/Modal/Modal";

import styles from "./SuccessModal.module.css";

function SuccessModal({ visible }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <p className={styles.title}>
          Login succeed. Navigating to userpage in seconds
        </p>
      </div>
    </Modal>
  );
}

export default SuccessModal;
