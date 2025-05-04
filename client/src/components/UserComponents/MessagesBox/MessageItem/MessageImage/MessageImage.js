import styles from "./MessageImage.module.css";

function MessageImage({ imagesUrl, images }) {
  const imagesListRender = [];

  for (let i = 0; i < images.length; ++i) {
    imagesListRender.push(
      <li key={imagesUrl[i]} className={styles.imageContainer}>
        <a href={imagesUrl[i]} target="_blank" rel="noreferrer">
          <img src={imagesUrl[i]} alt={images[i]} className={styles.image} />
        </a>
      </li>
    );
  }

  return (
    <div>
      <ul className={styles.imageList}>{imagesListRender}</ul>
    </div>
  );
}

export default MessageImage;
