import { useState } from "react";

import Posts from "../../../components/UserComponents/Posts/Posts";
import CreatePostButton from "../../../components/UserComponents/CreatePostButton/CreatePostButton";
import CreatePostModal from "../../../components/UserComponents/CreatePostModal/CreatePostModal";

import styles from "./UserPosts.module.css";

function UserPosts() {
  const [createPostModal, setCreatePostModal] = useState(false);

  const onClickOpenCreatePostModal = () => {
    setCreatePostModal(true);
  };

  const onClickCloseCreatePostModal = () => {
    setCreatePostModal(false);
  };
  return (
    <div className={styles.rootContainer}>
      <CreatePostButton
        onClickOpenCreatePostModal={onClickOpenCreatePostModal}
      />
      <Posts />
      <CreatePostModal
        createPostModal={createPostModal}
        onClickClosePostModal={onClickCloseCreatePostModal}
      />
    </div>
  );
}

export default UserPosts;
