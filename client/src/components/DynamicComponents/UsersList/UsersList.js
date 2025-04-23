import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import UserItem from "./UserItem/UserItem";

import { dropUsersById } from "../../../utils/friendsConfigs/sortFriends";

import {
  userFriendsSlice,
  userWaitingFriendsSlice,
} from "../../../redux/userSlice";

import styles from "./UsersList.module.css";

function UsersList({ isAuth, usersList, loading }) {
  const friendsList = useSelector((state) => state[userFriendsSlice.name]);

  const waitingFriendsList = useSelector(
    (state) => state[userWaitingFriendsSlice.name]
  );

  const newUsersList = !isAuth
    ? usersList
    : dropUsersById(usersList, friendsList, waitingFriendsList);

  if (loading === true) {
    return (
      <div className={styles.spinners}>
        <ClipLoader size={50} color="#246bce" />
        <p>Looking for users...</p>
      </div>
    );
  }

  if (newUsersList.length === 0 && loading === false) {
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
