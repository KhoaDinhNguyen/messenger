import styles from "./Modal.module.css";

function Modal({ children, visible, overrideStyle }) {
  return (
    <div
      className={`${styles.rootContainer} ${overrideStyle}`}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}

export default Modal;
