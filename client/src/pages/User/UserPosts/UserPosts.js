import Posts from "../../../components/UserComponents/Posts/Posts";
import CreatePost from "../../../components/UserComponents/CreatePost/CreatePost";
import styles from "./UserPosts.module.css";

function UserPosts() {
  return (
    <div className={styles.rootContainer}>
      <CreatePost />
      <Posts />
    </div>
  );
}

export default UserPosts;
