import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import Picker from "emoji-picker-react";

import ImageList from "./ImageList/ImageList";
import CommentForm from "./CommentForm/CommentForm";
import EmojiList from "./EmojiList/EmojiList";

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
    emoji,
  } = post;
  const params = useParams();
  const [visibleEmoji, setVisibleEmoji] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const onChangeVisibleEmoji = () => {
    setVisibleEmoji((state) => !state);
  };

  useEffect(() => {
    const graphQLQuery = {
      query: `
        query GetEmoji($emojiInput: [String]){
          getEmoji(emojiInput: {emojiIdArray: $emojiInput}) {
            emojiCreatorId
            emoji
            postId
            commentId
          }
        }
      `,
      variables: {
        emojiInput: emoji,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    fetch(process.env.REACT_APP_SERVER_API, {
      method: "POST",
      body: bodyJSON,
      headers: myHeaders,
    })
      .then((jsonResponse) => jsonResponse.json())
      .then((response) => {
        if (response.data === undefined) {
        } else {
          setEmojis(response.data.getEmoji);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [emoji]);

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

  const onClickEmoji = (emoji) => {
    const graphQLQuery = {
      query: `
        mutation UpdatePostEmoji($postId: String!, $emojiCreatorId: String!, $emoji: String!){
          updatePostEmoji(postInput:{
            postId: $postId,
            emojiCreatorId: $emojiCreatorId,
            emoji: $emoji
          })
        }
      `,
      variables: {
        postId: _id,
        emojiCreatorId: params.userid,
        emoji: emoji.emoji,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    fetch(process.env.REACT_APP_SERVER_API, {
      method: "POST",
      body: bodyJSON,
      headers: myHeaders,
    })
      .then((jsonResponse) => jsonResponse.json())
      .then((resopnse) => {
        if (resopnse.data === undefined) {
        } else {
          setEmojis((emojiList) => {
            return [
              ...emojiList.filter(
                (emojiItem) => emojiItem.emojiCreatorId !== params.userid
              ),
              {
                emojiCreatorId: params.userid,
                emoji: emoji.emoji,
                postId: _id,
                commentId: null,
              },
            ];
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setVisibleEmoji((state) => false);
  };
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
      <div className={styles.emojiListContainer}>
        <EmojiList emojiList={emojis} />
      </div>
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
                  onEmojiClick={onClickEmoji}
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
