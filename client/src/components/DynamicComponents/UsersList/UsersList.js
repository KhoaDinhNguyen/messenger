import UserItem from "./UserItem/UserItem";

import styles from "./UsersList.module.css";

function UsersList({ isAuth, usersList }) {
  if (usersList.length === 0) {
    return (
      <div>
        <p className={styles.text}>No user found!</p>
      </div>
    );
  }
  const usersListRender = usersList.map((user) => {
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
