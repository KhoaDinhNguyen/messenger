import Modal from "../../Utils/Modal/Modal/Modal";
import ScaleLoader from "react-spinners/ScaleLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ visible }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <ScaleLoader size={"30px"} />
        <p className={styles.title}>Sending messages...</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
