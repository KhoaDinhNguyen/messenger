import { useState } from "react";

import SearchUsersForm from "../../../components/DynamicComponents/SearchUsersForm/SearchUsersForm";
import UsersList from "../../../components/DynamicComponents/UsersList/UsersList";
import WaitingFriendList from "../../../components/UserComponents/WaitingFriendList/WaitngFriendList";

import styles from "./SearchUsers.module.css";

function SearchUsers({ isAuth }) {
  const [usersList, setUsersList] = useState([]);

  return (
    <div className={styles.rootContainer}>
      <SearchUsersForm setUsersList={setUsersList} />
      {isAuth && <WaitingFriendList />}
      <UsersList usersList={usersList} isAuth={isAuth} />
    </div>
  );
}

export default SearchUsers;
