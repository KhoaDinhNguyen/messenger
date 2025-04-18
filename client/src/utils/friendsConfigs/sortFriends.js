function dropFriendsById(friends, notIncludeFriends) {
  return friends.filter((friend) => {
    if (notIncludeFriends.includes(friend._id)) {
      return false;
    }
  });
}

export { dropFriendsById };
