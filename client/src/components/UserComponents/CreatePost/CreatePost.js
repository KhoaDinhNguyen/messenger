import { useState } from "react";

import CreatePostButton from "./CreatePostButton/CreatePostButton";
import CreatePostModal from "./CreatePostModal/CreatePostModal";

function CreatePost() {
  const [createPostModal, setCreatePostModal] = useState(false);

  const onClickOpenCreatePostModal = () => {
    setCreatePostModal(true);
  };

  const onClickCloseCreatePostModal = () => {
    setCreatePostModal(false);
  };

  return (
    <div>
      <CreatePostButton
        onClickOpenCreatePostModal={onClickOpenCreatePostModal}
      />
      <CreatePostModal
        createPostModal={createPostModal}
        onClickClosePostModal={onClickCloseCreatePostModal}
      />
    </div>
  );
}

export default CreatePost;
