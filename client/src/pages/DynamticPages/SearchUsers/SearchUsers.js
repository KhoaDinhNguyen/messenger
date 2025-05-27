import { useEffect, useState } from "react";

import SearchUsersForm from "../../../components/DynamicComponents/SearchUsersForm/SearchUsersForm";
import UsersList from "../../../components/DynamicComponents/UsersList/UsersList";
import WaitingFriendList from "../../../components/UserComponents/WaitingFriendList/WaitngFriendList";

import styles from "./SearchUsers.module.css";

function SearchUsers({ isAuth }) {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "MessApp | Friends";
  }, []);
  return (
    <div className={styles.rootContainer}>
      <SearchUsersForm setUsersList={setUsersList} setLoading={setLoading} />
      {isAuth && <WaitingFriendList />}
      <UsersList usersList={usersList} isAuth={isAuth} loading={loading} />
    </div>
  );
}

export default SearchUsers;
