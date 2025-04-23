import { useSearchParams } from "react-router";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./CurrentFriend.module.css";

function CurrentFriend() {
  const [searchParams] = useSearchParams();

  const friendName = searchParams.get("friendName");
  return (
    <div className={styles.rootContainer}>
      <div>
        <img src={userpublic} alt="user" className={styles.image} />
      </div>
      <div className={styles.nameContainer}>
        <p className={styles.name}>{friendName}</p>
      </div>
    </div>
  );
}

export default CurrentFriend;
