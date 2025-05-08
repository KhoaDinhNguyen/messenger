import { Fragment } from "react";

import { getDayInYear, getTimeInDay } from "../../../utils/dateConfigs/format";
import { getRandomString } from "../../../utils/fileConfigs/format";

import userpublic from "../../../asset/img/userpublic.png";

import styles from "./PostItem.module.css";

function PostItem({ post }) {
  const { content, title, createdAt, imagesUrl, creatorName } = post;

  const renderedContent = content.split("\n").map((subStr) => {
    return (
      <Fragment key={getRandomString(64)}>
        {subStr}
        <br />
      </Fragment>
    );
  });

  return (
    <div className={styles.rootContainer}>
      <div className={styles.postHeaderContainer}>
        <div className={styles.creatorProfile}>
          <div className={styles.imageContainer}>
            <img src={userpublic} alt="user" className={styles.image} />
          </div>
          <div>
            <p className={styles.name}>{creatorName}</p>
            <p className={styles.date}>
              {getDayInYear(new Date(Number(createdAt)))}{" "}
              {getTimeInDay(createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.title}>{title}</p>
        <p>{renderedContent}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <div>
          <p>Emoji</p>
        </div>
        <div>
          <p>Comment</p>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
