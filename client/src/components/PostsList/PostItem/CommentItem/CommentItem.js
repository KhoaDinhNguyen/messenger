import { useEffect, useState, Fragment } from "react";
import userpublic from "../../../../asset/img/userpublic.png";

import {
  getDayInYear,
  getTimeInDay,
} from "../../../../utils/dateConfigs/format";

import { getRandomString } from "../../../../utils/fileConfigs/format";

import styles from "./CommentItem.module.css";

function CommentItem({ comment }) {
  const { creatorId, creatorName, text, createdAt } = comment;
  const [creatorImage, setCreatorImage] = useState("");

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
  });

  return (
    <div className={styles.rootContainer}>
      <div className={styles.imageContainer}>
        <img
          src={creatorImage && creatorImage !== "" ? creatorImage : userpublic}
          alt="user"
          className={styles.userImage}
        />
      </div>
      <div>
        <div className={styles.textContainer}>
          <div className={styles.creatorNameContainer}>
            <p className={styles.creatorName}>{creatorName}</p>
          </div>
          <div>
            <p>{renderedText}</p>
          </div>
        </div>
        <div>
          <p className={styles.time}>
            {getDayInYear(new Date(Number(createdAt)))} -{" "}
            {getTimeInDay(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
