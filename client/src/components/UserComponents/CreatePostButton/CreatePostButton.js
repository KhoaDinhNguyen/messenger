import InputButton from "../../Utils/InputButton/InputButton";

function CreatePostButton({ onClickOpenCreatePostModal }) {
  return (
    <div>
      <InputButton
        id={"creatPost"}
        type={"button"}
        valueButton={"Share your day"}
        onClickHandler={onClickOpenCreatePostModal}
      />
    </div>
  );
}

export default CreatePostButton;
