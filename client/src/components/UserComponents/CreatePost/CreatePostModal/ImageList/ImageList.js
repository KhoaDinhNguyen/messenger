import ImageItem from "../ImageItem/ImageItem";

import styles from "./ImageList.module.css";

function ImageList({ images, onClickRemoveImage }) {
  if (images.length === 0) {
    return <></>;
  }
  const renderedImages = images.map((image) => {
    const { url, fileName } = image;
    return (
      <li key={fileName}>
        <ImageItem
          url={url}
          fileName={fileName}
          onClickRemoveImage={onClickRemoveImage}
        />
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.listImage}>{renderedImages}</ul>
    </div>
  );
}

export default ImageList;
