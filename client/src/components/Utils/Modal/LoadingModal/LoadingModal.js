import Modal from "../Modal/Modal";
import FadeLoader from "react-spinners/FadeLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ visible, message }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <FadeLoader loading={visible} />
        <p className={styles.title}>{message}</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
