import ImageItem from "../ImageItem/ImageItem";

import styles from "./ImageList.module.css";

function ImageList({ images, onClickDeleteImage }) {
  const imagesListRender = images.map((image) => {
    return (
      <li key={image.url}>
        <ImageItem
          url={image.url}
          fileName={image.fileName}
          onClickDeleteImage={onClickDeleteImage}
        />
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.imagesList}>{imagesListRender}</ul>
    </div>
  );
}

export default ImageList;
