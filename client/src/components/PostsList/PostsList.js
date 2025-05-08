import { useSelector } from "react-redux";

import PostItem from "./PostItem/PostItem";

import { postsSlice } from "../../redux/postSlice";

import styles from "./PostList.module.css";

function PostsList() {
  const postsList = useSelector((state) => state[postsSlice.name]);

  const postsRender = postsList.map((post) => {
    return (
      <li key={post._id}>
        <PostItem post={post} />
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.postList}>{postsRender}</ul>
    </div>
  );
}

export default PostsList;
