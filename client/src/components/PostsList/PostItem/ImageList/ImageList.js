import ImageItem from "../ImageItem/ImageItem";

import styles from "./ImageList.module.css";

function ImageList({ images }) {
  const renderedImages = images.map((image) => {
    const { url, fileName } = image;
    return (
      <li key={fileName}>
        <ImageItem url={url} fileName={fileName} />
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.imageList}>{renderedImages}</ul>
    </div>
  );
}

export default ImageList;
