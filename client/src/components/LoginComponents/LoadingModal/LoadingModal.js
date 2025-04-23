import Modal from "../../Utils/Modal/Modal/Modal";
import CircleLoader from "react-spinners/CircleLoader";

import styles from "./LoadingModal.module.css";

function LoadingModal({ visible }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <CircleLoader size={"30px"} />
        <p className={styles.title}>Authenticating...</p>
      </div>
    </Modal>
  );
}

export default LoadingModal;
