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

    if (
      isNaN(new Date(friend1.latestMessage.createdAt)) ||
      isNaN(new Date(friend2.latestMessage.createdAt))
    ) {
      const dateFriend1 = !isNaN(new Date(friend1.latestMessage.createdAt))
        ? new Date(friend1.latestMessage.createdAt).getTime()
        : friend1.latestMessage.createdAt;
      const dateFriend2 = !isNaN(new Date(friend2.latestMessage.createdAt))
        ? new Date(friend2.latestMessage.createdAt).getTime()
        : friend2.latestMessage.createdAt;

      return dateFriend2 - dateFriend1;
    }

    return friend2.latestMessage.createdAt - friend1.latestMessage.createdAt;
  });
}

export { dropUsersById, sortFriendsByLatestMessage };
