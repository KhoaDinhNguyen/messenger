function dropUsersById(usersList, friendsList, waitingFriendsList) {
  // console.log(friendsList);
  const extractIdsFromFriendsList = friendsList.map(
    (friend) => friend.friendId
  );
  // console.log(extractIdsFromFriendsList);
  const extractIdsFromWaitingFriendsList = waitingFriendsList.map(
    (friend) => friend.friendId
  );

  const noneAppearNonUsersList = [
    ...extractIdsFromFriendsList,
    ...extractIdsFromWaitingFriendsList,
  ];

  // console.log(noneAppearNonUsersList);
  return usersList.filter((friend) => {
    // console.log(friend);
    if (noneAppearNonUsersList.includes(friend._id)) {
      return false;
    }
    return true;
  });
}

export { dropUsersById };
