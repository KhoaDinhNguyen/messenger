function dropUsersById(usersList, friendsList, waitingFriendsList) {
  const extractIdsFromFriendsList = friendsList.map((friend) => friend._id);
  const extractIdsFromWaitingFriendsList = waitingFriendsList.map(
    (friend) => friend.friendId
  );

  const noneAppearNonUsersList = [
    ...extractIdsFromFriendsList,
    ...extractIdsFromWaitingFriendsList,
  ];

  return usersList.filter((friend) => {
    if (noneAppearNonUsersList.includes(friend._id)) {
      return false;
    }
    return true;
  });
}

export { dropUsersById };
