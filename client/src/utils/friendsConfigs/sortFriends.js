function dropUsersById(usersList, friendsList, waitingFriendsList) {
  const extractIdsFromFriendsList = friendsList.map(
    (friend) => friend.friendId
  );
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

function sortFriendsByLatestMessage(friendList, userid) {
  return friendList.sort((friend1, friend2) => {
    if (friend1.latestMessage === null && friend2.latestMessage === null) {
      return 0;
    } else if (
      friend1.latestMessage === null &&
      friend2.latestMessage !== null
    ) {
      return -1;
    } else if (
      friend1.latestMessage !== null &&
      friend2.latestMessage === null
    ) {
      return 1;
    }

    return friend2.latestMessage.createdAt - friend1.latestMessage.createdAt;
  });
}

export { dropUsersById, sortFriendsByLatestMessage };
