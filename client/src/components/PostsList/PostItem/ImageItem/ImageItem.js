import styles from "./ImageItem.module.css";

function ImageItem({ url, fileName }) {
  return (
    <div>
      <a href={url} target="_blank" rel="noreferrer">
        <img src={url} alt={fileName} className={styles.image} />
      </a>
    </div>
  );
}

export default ImageItem;
