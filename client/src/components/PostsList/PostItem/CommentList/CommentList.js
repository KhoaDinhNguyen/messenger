import { useEffect, useState } from "react";

import CommentItem from "../CommentItem/CommentItem";

import styles from "./CommentList.module.css";

function CommnetList({ comments }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const graphQLQuery = {
      query: `
        query GetComments($commentIdArray: [String!]!){
          getComments(commentInput:{commentIdArray: $commentIdArray}) {
            id
            text
            creatorName
            creatorId
            comments
            createdAt
            level
          }
        }
      `,
      variables: {
        commentIdArray: comments,
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
        console.log(response);
        if (response.data === null) {
        } else {
          setCommentList(response.data.getComments);
        }
      });
  }, [comments]);

  if (commentList.length === 0) {
    return <></>;
  }

  const renderedCommentList = commentList.map((comment) => {
    return (
      <li key={comment.id}>
        <CommentItem comment={comment} />
      </li>
    );
  });
  return (
    <div>
      <ul className={styles.commentList}>{renderedCommentList}</ul>
    </div>
  );
}

export default CommnetList;
