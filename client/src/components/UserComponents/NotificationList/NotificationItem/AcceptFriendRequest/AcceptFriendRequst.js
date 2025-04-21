import { useDispatch } from "react-redux";

import InputButton from "../../../../Utils/InputButton/InputButton";

import { notificationListSlice } from "../../../../../redux/notificationSlice";

import userpublic from "../../../../../asset/img/userpublic.png";

import styles from "./AcceptFriendRequest.module.css";

function AcceptFriendRequest({ notification }) {
  const dispatch = useDispatch();
  const { senderId, message, receiverId } = notification;

  const onClickCloseNotification = () => {
    const graphQLQuery = {
      query: `
        mutation DropNotificationBySenderAndReceiver($senderId: String!, $receiverId: String!){
          dropNotificationBySenderAndReceiver(notificationInput:{
            senderId: $senderId
            receiverId: $receiverId
            type:"acceptFriendRequest"
          })
        }
      `,
      variables: {
        senderId: senderId.id,
        receiverId: receiverId.id,
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
          //TODO
        } else {
          dispatch(
            notificationListSlice.actions.removeNotification({
              senderId: senderId.id,
              receiverId: receiverId.id,
              type: "acceptFriendRequest",
            })
          );
        }
      });
  };

  return (
    <div>
      <p className={styles.title}>Friend Request Accepted</p>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <img alt="user" src={userpublic} className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.sender}>From: {senderId.name}</p>
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <InputButton
            id={`ok_${senderId}`}
            type={"button"}
            valueButton={"Have seen"}
            inputContainer={styles.seenInput}
            onClickHandler={onClickCloseNotification}
          />
        </div>
      </div>
    </div>
  );
}

export default AcceptFriendRequest;
