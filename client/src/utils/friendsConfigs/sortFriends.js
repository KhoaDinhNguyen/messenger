function dropFriendsById(friends, notIncludeFriends) {
  const extractNotIncludeFriends = notIncludeFriends.map(
    (friend) => friend._id
  );

  return friends.filter((friend) => {
    if (extractNotIncludeFriends.includes(friend._id)) {
      return false;
    }
    return true;
  });
}

export { dropFriendsById };
