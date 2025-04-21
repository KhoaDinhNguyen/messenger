import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import InputButton from "../../../../Utils/InputButton/InputButton";

import {
  nameSlice,
  userFriendsSlice,
  userWaitingFriendsSlice,
} from "../../../../../redux/userSlice";
import { notificationListSlice } from "../../../../../redux/notificationSlice";

import userpublic from "../../../../../asset/img/userpublic.png";

import styles from "./FriendRequest.module.css";

function FriendRequest({ notification }) {
  const params = useParams();
  const dispatch = useDispatch();
  const { message, senderId } = notification;
  const receiverId = params.userid;
  const receiverName = useSelector((state) => state[nameSlice.name]);

  const onClickDeclineFriendRequest = () => {
    const graphQLQuery = {
      query: `
        mutation DeclineFriendRequest($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!){
          declineFriendRequest(userInput: {
            senderId: $senderId,
            senderName: $senderName
            receiverId: $receiverId 
            receiverName: $receiverName
            message: "${receiverName} does not accept your friend request"
          }) {
            senderId {
              id,
              name
            }
            receiverId{
              id,
              name
            }
          }
        }
      `,
      variables: {
        senderId: receiverId,
        senderName: receiverName,
        receiverId: senderId.id,
        receiverName: senderId.name,
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
          const notification = response.data.declineFriendRequest;
          console.log(notification);
          dispatch(userWaitingFriendsSlice.actions.removeItem(senderId.id));
          dispatch(
            notificationListSlice.actions.removeNotification({
              senderId: senderId.id,
              receiverId: receiverId,
              type: "friendRequest",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickAcceptFriendRequest = () => {
    const graphQLQuery = {
      query: `
        mutation AcceptFriendRequest($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!){
          acceptFriendRequest(userInput: {
            senderId: $senderId,
            senderName: $senderName
            receiverId: $receiverId 
            receiverName: $receiverName
            message: "You and ${receiverName} are friends now"
          }) {
            senderId {
              id,
              name
            }
            receiverId{
              id,
              name
            }
          }
        }
      `,
      variables: {
        senderId: receiverId,
        senderName: receiverName,
        receiverId: senderId.id,
        receiverName: senderId.name,
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
          const notification = response.data.acceptFriendRequest;
          console.log(notification);
          dispatch(userWaitingFriendsSlice.actions.removeItem(senderId.id));
          dispatch(
            notificationListSlice.actions.removeNotification({
              senderId: senderId.id,
              receiverId: receiverId,
              type: "friendRequest",
            })
          );
          dispatch(
            userFriendsSlice.actions.addItem({
              friendId: notification.senderId.id,
              friendName: notification.senderId.name,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p className={styles.title}>Friend Request</p>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <img alt="user" src={userpublic} className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.sender}>From: {senderId.name}</p>
          <p className={styles.message}>Message: {message}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <InputButton
            id={`decline_${senderId}`}
            type={"button"}
            valueButton={"Decline"}
            inputContainer={styles.declineInput}
            onClickHandler={onClickDeclineFriendRequest}
          />
          <InputButton
            id={`accept_${senderId}`}
            type={"button"}
            valueButton={"Accept"}
            inputContainer={styles.acceptInput}
            onClickHandler={onClickAcceptFriendRequest}
          />
        </div>
      </div>
    </div>
  );
}

export default FriendRequest;
