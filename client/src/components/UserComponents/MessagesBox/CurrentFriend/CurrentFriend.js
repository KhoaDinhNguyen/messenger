import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import { userFriendsSlice } from "../../../../redux/userSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./CurrentFriend.module.css";

function CurrentFriend() {
  const [searchParams] = useSearchParams();
  const friendsList = useSelector((state) => state[userFriendsSlice.name]);

  const friendName = searchParams.get("friendName");
  const friendImage = searchParams.get("friendImage");

  return (
    <div className={styles.rootContainer}>
      <div>
        <img
          src={
            friendImage !== "null" && friendImage !== ""
              ? friendImage
              : userpublic
          }
          alt="user"
          className={styles.image}
        />
      </div>
      <div className={styles.nameContainer}>
        <p className={styles.name}>{friendName}</p>
      </div>
    </div>
  );
}

export default CurrentFriend;
