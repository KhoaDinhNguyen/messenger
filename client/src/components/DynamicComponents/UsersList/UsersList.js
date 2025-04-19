import { useSelector } from "react-redux";

import UserItem from "./UserItem/UserItem";

import { dropFriendsById } from "../../../utils/friendsConfigs/sortFriends";

import {
  userFriendsSlice,
  userWaitingFriendsSlice,
} from "../../../redux/userSlice";

import styles from "./UsersList.module.css";

function UsersList({ isAuth, usersList }) {
  const friendsList = useSelector((state) => state[userFriendsSlice.name]);

  const newUsersList = dropFriendsById(usersList, friendsList);

  if (newUsersList.length === 0) {
    return (
      <div>
        <p className={styles.text}>No user found!</p>
      </div>
    );
  }
  const usersListRender = newUsersList.map((user) => {
    return (
      <li key={user._id}>
        <UserItem isAuth={isAuth} user={user} />
      </li>
    );
  });

  return (
    <div className={styles.rootContainer}>
      <ul className={styles.listContainer}>{usersListRender}</ul>
    </div>
  );
}

export default UsersList;
