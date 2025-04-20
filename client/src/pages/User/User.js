import { Outlet, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import UserNavigation from "../../components/UserComponents/UserNavigation/UserNavigation";
import UserSocket from "../../components/UserComponents/UserSocket/UserSocket";

import {
  userFriendsSlice,
  userWaitingFriendsSlice,
  nameSlice,
} from "../../redux/userSlice";
import { notificationListSlice } from "../../redux/notificationSlice";

function User() {
  const params = useParams();
  const dispatch = useDispatch();

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
          friends{
            _id
          },
          waitingFriends{
            friendId,
            friendName,
            type
          }
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
          const { friends, waitingFriends, name } = response.data.findUserById;
          // console.log(response);
          dispatch(userFriendsSlice.actions.init(friends));
          dispatch(userWaitingFriendsSlice.actions.init(waitingFriends));
          dispatch(nameSlice.actions.init(name));
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
          _id,
              receiverId {
                id,
                name
              },
              senderId {
                id,
                name
              },
              message,
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

    findUserById();
    getNotificationById();

    console.log("USER");
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
