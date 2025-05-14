import { useSelector } from "react-redux";

import CommentItem from "../CommentItem/CommentItem";

import { commentSlice } from "../../../../redux/commentSlice";

import styles from "./CommentList.module.css";

function CommnetList({ comments }) {
  const commentList = useSelector((state) => state[commentSlice.name]).filter(
    (comment) => {
      return comments.includes(comment.id);
    }
  );

  if (comments.length === 0) {
    return <></>;
  }

  const renderedCommentList =
    commentList !== undefined ? (
      commentList.map((comment) => {
        return (
          <li key={comment.id}>
            <CommentItem comment={comment} />
          </li>
        );
      })
    ) : (
      <></>
    );
  return (
    <div>
      <ul className={styles.commentList}>{renderedCommentList}</ul>
    </div>
  );
}

export default CommnetList;
