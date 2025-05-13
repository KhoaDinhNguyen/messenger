import { Fragment, useState } from "react";
import Picker from "emoji-picker-react";

import ImageList from "./ImageList/ImageList";
import CommentForm from "./CommentForm/CommentForm";

import { getDayInYear, getTimeInDay } from "../../../utils/dateConfigs/format";
import { getRandomString } from "../../../utils/fileConfigs/format";

import { EmojiSVG } from "../../../utils/svgConfigs/SVG";
import userpublic from "../../../asset/img/userpublic.png";

import styles from "./PostItem.module.css";
import CommnetList from "./CommentList/CommentList";

function PostItem({ post }) {
  const {
    content,
    title,
    createdAt,
    imagesUrl,
    images,
    creatorName,
    creatorImageUrl,
    _id,
    comments,
  } = post;

  const [visibleEmoji, setVisibleEmoji] = useState(false);

  const onChangeVisibleEmoji = () => {
    setVisibleEmoji((state) => !state);
  };

  const renderedContent = content.split("\n").map((subStr) => {
    return (
      <Fragment key={getRandomString(64)}>
        {subStr}
        <br />
      </Fragment>
    );
  });

  const postImages = [];

  for (let i = 0; i < images.length; ++i) {
    postImages.push({ url: imagesUrl[i], fileName: images[i] });
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.postHeaderContainer}>
        <div className={styles.creatorProfile}>
          <div className={styles.imageContainer}>
            <img
              src={
                creatorImageUrl && creatorImageUrl !== ""
                  ? creatorImageUrl
                  : userpublic
              }
              alt="user"
              className={styles.image}
            />
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
        <p className={styles.content}>{renderedContent}</p>
      </div>
      {postImages.length > 0 && (
        <div>
          <ImageList images={postImages} />
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <div className={styles.emojiContainer}>
          <div onClick={onChangeVisibleEmoji} className={styles.emojiButton}>
            <EmojiSVG />
          </div>
          {visibleEmoji && (
            <div className={styles.emojiPickerContainer}>
              <div className={styles.emojiPicker}>
                <Picker
                  reactions={["1f496", "1f44d", "1f602", "1f62d", "1f621"]}
                  reactionsDefaultOpen={true}
                  emojiStyle="native"
                  allowExpandReactions={false}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <p className={styles.commentText}>Comment</p>
        </div>
      </div>
      {comments.length > 0 && (
        <div>
          <CommnetList comments={comments} />
        </div>
      )}

      <div>
        <CommentForm postId={_id} />
      </div>
    </div>
  );
}

export default PostItem;
