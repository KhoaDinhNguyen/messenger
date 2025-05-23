import { Outlet, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import UserNavigation from "../../components/UserComponents/UserNavigation/UserNavigation";
import UserSocket from "../../components/UserComponents/UserSocket/UserSocket";

import {
  userFriendsSlice,
  userWaitingFriendsSlice,
  nameSlice,
  dobSlice,
  genderSlice,
  pronounceSlice,
  emailSlice,
  phoneSlice,
  profileImageFileNameSlice,
  profileImageFileURLSlice,
  profileUrlSlice,
} from "../../redux/userSlice";

import Socket from "./socket";

import { notificationListSlice } from "../../redux/notificationSlice";

import {
  currentSenderSlice,
  latestMessageSlice,
} from "../../redux/messageSlice";

function User() {
  const params = useParams();
  const dispatch = useDispatch();

  if (Socket.getSocket() === undefined) {
    console.log("init socket");
    Socket.init(params.userid);
  } else if (Socket.getSocket().disconnected) {
    console.log("reconnect socket");
    Socket.init(params.userid);
  }
  useEffect(() => {
    function findUserById() {
      const graphQLQuery = {
        query: `
        query FindUserById($id: String!){
          findUserById(userInput: {id: $id}) {
            gender,
            pronounce,
            name,
            phone,
            dob,
            email,
            friends{
              friendId,
              friendName,
            },
            waitingFriends{
              friendId,
              friendName,
              type
            }
            profileUrl
            profileImageName
            profileImageURL
            }
        }
      `,
        variables: {
          id: params.userid,
        },
      };

      const bodyJSON = JSON.stringify(graphQLQuery);
      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");

      fetch(process.env.REACT_APP_SERVER_API, {
        method: "POST",
        body: bodyJSON,
        headers: myHeaders,
      })
        .then((jsonResponse) => jsonResponse.json())
        .then(async (response) => {
          const {
            friends,
            waitingFriends,
            name,
            gender,
            pronounce,
            email,
            phone,
            dob,
            profileImageName,
            profileImageURL,
            profileUrl,
          } = response.data.findUserById;

          const friendsWithImagesPromises = friends.map(async (friend) => {
            const friendRequest = {
              query: `
              query GenerateImageURLWithUserId($id: String!){
                generateImageURLWithUserId(userInput:{id:$id}) {
                  id
                  name
                  profileImageURL
                }
              }
            `,
              variables: {
                id: friend.friendId,
              },
            };

            const bodyJSONFriendRequest = JSON.stringify(friendRequest);
            const myHeadersFriendRequest = new Headers();
            myHeadersFriendRequest.append("Content-type", "application/json");

            return fetch(process.env.REACT_APP_SERVER_API, {
              method: "POST",
              body: bodyJSONFriendRequest,
              headers: myHeadersFriendRequest,
            })
              .then((jsonResponse) => jsonResponse.json())
              .catch((err) => {
                console.log(err);
              });
          });

          const friendsWithImages = await Promise.all(
            friendsWithImagesPromises
          );

          const friendsWithImagesRedux = friendsWithImages.map((response) => {
            const friend = response.data.generateImageURLWithUserId;
            return {
              friendId: friend.id,
              friendName: friend.name,
              friendImageURL: friend.profileImageURL,
            };
          });

          const waitingFriendsWithImagesPromises = waitingFriends.map(
            async (friend) => {
              const friendRequest = {
                query: `
              query GenerateImageURLWithUserId($id: String!){
                generateImageURLWithUserId(userInput:{id:$id}) {
                  id
                  name
                  profileImageURL
                }
              }
            `,
                variables: {
                  id: friend.friendId,
                },
              };

              const bodyJSONWaitingFriendRequest =
                JSON.stringify(friendRequest);
              const myHeadersWaitingFriendRequest = new Headers();
              myHeadersWaitingFriendRequest.append(
                "Content-type",
                "application/json"
              );

              return fetch(process.env.REACT_APP_SERVER_API, {
                method: "POST",
                body: bodyJSONWaitingFriendRequest,
                headers: myHeadersWaitingFriendRequest,
              })
                .then((jsonResponse) => jsonResponse.json())
                .catch((err) => {
                  console.log(err);
                });
            }
          );

          const waitingFriendsWithImages = await Promise.all(
            waitingFriendsWithImagesPromises
          );

          const waitingFriendsWithImagesRedux = waitingFriendsWithImages.map(
            (response) => {
              //TODO: Improve complexity
              const friend = response.data.generateImageURLWithUserId;
              const friendType = waitingFriends.filter((friendItem) => {
                return friendItem.friendId === friend.id;
              })[0].type;

              return {
                friendId: friend.id,
                friendName: friend.name,
                type: friendType,
                friendImageUrl: friend.profileImageURL,
              };
            }
          );

          //TODO: ???
          const currentSenderRedux = friendsWithImagesRedux.filter(
            (friend) => friend.friendId === params.userid
          );

          dispatch(userFriendsSlice.actions.init(friendsWithImagesRedux));
          dispatch(
            userWaitingFriendsSlice.actions.init(waitingFriendsWithImagesRedux)
          );
          dispatch(nameSlice.actions.init(name));
          dispatch(dobSlice.actions.init(dob));
          dispatch(genderSlice.actions.init(gender));
          dispatch(pronounceSlice.actions.init(pronounce));
          dispatch(emailSlice.actions.init(email));
          dispatch(phoneSlice.actions.init(phone));
          dispatch(profileUrlSlice.actions.init(profileUrl));
          dispatch(profileImageFileNameSlice.actions.init(profileImageName));
          dispatch(profileImageFileURLSlice.actions.init(profileImageURL));
          dispatch(currentSenderSlice.actions.assign(currentSenderRedux[0]));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getNotificationById() {
      const graphQLQuery = {
        query: `
        query GetNotificationsById($id: String!) {
          getNotificationsById(userInput:{id: $id}) {
            _id
            receiverId
            receiverName
            senderId
            senderName
            message
            type
          }
        }
      `,
        variables: {
          id: params.userid,
        },
      };

      const bodyJSON = JSON.stringify(graphQLQuery);
      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");

      fetch(process.env.REACT_APP_SERVER_API, {
        method: "POST",
        body: bodyJSON,
        headers: myHeaders,
      })
        .then((jsonResponse) => jsonResponse.json())
        .then((response) => {
          if (response.data !== null) {
            dispatch(
              notificationListSlice.actions.init(
                response.data.getNotificationsById
              )
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getLastestMessage() {
      const graphQLQuery = {
        query: `
          query GetLatestMessages($id: String!) {
            getLatestMessages(userInput:{
              id:$id
            }) {
              text
              senderName
              senderId
              receiverName
              receiverId
              haveSeen
              createdAt
              images
              _id
            }
          }
        `,
        variables: {
          id: params.userid,
        },
      };

      const bodyJSON = JSON.stringify(graphQLQuery);
      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");

      fetch(process.env.REACT_APP_SERVER_API, {
        method: "POST",
        body: bodyJSON,
        headers: myHeaders,
      })
        .then((jsonResponse) => jsonResponse.json())
        .then((response) => {
          if (response.data === null) {
          } else {
            dispatch(
              latestMessageSlice.actions.init(response.data.getLatestMessages)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    findUserById();
    getNotificationById();
    getLastestMessage();
  }, [dispatch, params.userid]);

  return (
    <>
      <UserSocket userid={params.userid} />
      <UserNavigation />
      <Outlet />
    </>
  );
}

export default User;
