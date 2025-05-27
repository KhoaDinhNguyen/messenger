import { useSearchParams } from "react-router";
import { useEffect } from "react";

import FriendList from "../../../components/UserComponents/FriendList/FriendList";
import FriendInfo from "../../../components/UserComponents/FriendInfo/FriendInfo";
import MessagesBox from "../../../components/UserComponents/MessagesBox/MessagesBox";

import styles from "./UserMessages.module.css";

function UserMessages() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = "MessApp | Messenger";
  }, []);

  return (
    <div className={styles.rootContainer}>
      <FriendList setSearchParams={setSearchParams} />
      <MessagesBox searchParams={searchParams} />
      <FriendInfo searchParams={searchParams} />
    </div>
  );
}

export default UserMessages;
