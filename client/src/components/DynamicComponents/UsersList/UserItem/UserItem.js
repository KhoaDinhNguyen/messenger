import InputButton from "../../../Utils/InputButton/InputButton";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./UserItem.module.css";

function UserItem({ user, isAuth }) {
  const { name, profileUrl, pronounce } = user;

  const onClickSeeDetails = () => {
    window.open(profileUrl, "_blank");
  };

  return (
    <div className={styles.rootContainer}>
      <div>
        <img src={userpublic} alt="user" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.title}>{name}</p>
        <p className={styles.pronounce}>{pronounce}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <InputButton
          type={"button"}
          valueButton={"See profile"}
          id={"seeUserProfile"}
          onClickHandler={onClickSeeDetails}
          inputContainer={styles.seeProfileInput}
        />
        {isAuth && (
          <InputButton
            type={"button"}
            valueButton={"Add friend"}
            id={"addFriend"}
            inputContainer={styles.addFriendInput}
          />
        )}
      </div>
    </div>
  );
}

export default UserItem;
