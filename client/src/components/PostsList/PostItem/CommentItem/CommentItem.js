import { useEffect, useState, Fragment } from "react";

import CommentForm from "../CommentForm/CommentForm";
import CommnetList from "../CommentList/CommentList";

import { getDiffTime } from "../../../../utils/dateConfigs/format";
import { getRandomString } from "../../../../utils/fileConfigs/format";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./CommentItem.module.css";

function CommentItem({ comment }) {
  const { creatorId, creatorName, text, createdAt, id, comments, level } =
    comment;
  const [creatorImage, setCreatorImage] = useState("");
  const [visibleCommentForm, setVisibleCommentForm] = useState(false);

  const onChangeVisibleCommentForm = () => {
    setVisibleCommentForm((state) => !state);
  };
  const renderedText = text.split("\n").map((subStr) => {
    return (
      <Fragment key={getRandomString(64)}>
        {subStr}
        <br />
      </Fragment>
    );
  });

  useEffect(() => {
    const graphQLQuery = {
      query: `
        query GenerateImageURLWithUserId($id: String!){
          generateImageURLWithUserId(userInput:{id:$id}) {
            id
            name
            profileImageURL
          }
        }
      `,
      variables: {
        id: creatorId,
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
        if (response.data !== null) {
          setCreatorImage(
            response.data.generateImageURLWithUserId.profileImageURL
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [comments, creatorId]);

  return (
    <div className={styles.rootContainer}>
      <div className={styles.thisCommentContainer}>
        <div className={styles.imageContainer}>
          <img
            src={
              creatorImage && creatorImage !== "" ? creatorImage : userpublic
            }
            alt="user"
            className={styles.userImage}
          />
        </div>
        <div className={styles.commentFooter}>
          <div className={styles.textContainer}>
            <div className={styles.creatorNameContainer}>
              <p className={styles.creatorName}>{creatorName}</p>
            </div>
            <div className={styles.contentContainer}>
              <p className={styles.text}>{renderedText}</p>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <div>
              <p className={styles.time}>
                {getDiffTime(new Date(Number(createdAt)))}
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <p className={styles.like}>Like</p>
            </div>
            {level < 2 && (
              <div
                onClick={onChangeVisibleCommentForm}
                className={`${styles.commentButton} ${styles.buttonContainer}`}
              >
                <p className={styles.comment}>Comment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {comments.length > 0 && (
        <div className={styles.otherComments}>
          <div className={styles.commentsList}>
            <CommnetList comments={comments} />
          </div>
        </div>
      )}
      {visibleCommentForm && (
        <div className={styles.commentForm}>
          <CommentForm
            commentId={id}
            onChangeVisibleCommentForm={onChangeVisibleCommentForm}
            level={level + 1}
          />
        </div>
      )}
    </div>
  );
}

export default CommentItem;
