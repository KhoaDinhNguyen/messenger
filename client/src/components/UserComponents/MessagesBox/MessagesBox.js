import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import CurrentFriend from "./CurrentFriend/CurrentFriend";

import { currentMessageSlice } from "../../../redux/messageSlice";

import { nameSlice } from "../../../redux/userSlice";

import styles from "./MessagesBox.module.css";

function MessagesBox({ searchParams }) {
  const params = useParams();
  const dispatch = useDispatch();
  const senderId = params.userid;
  const senderName = useSelector((state) => state[nameSlice.name]);
  const receiverId = searchParams.get("friendId");
  const receiverName = searchParams.get("friendName");

  useEffect(() => {
    if (receiverId !== null && receiverName !== null) {
      const graphQLQuery = {
        query: `
          query GetMessage($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!){
            getMessage(messageInput:{
              senderId: $senderId
              senderName: $senderName
              receiverId: $receiverId
              receiverName: $receiverName
            }) {
              _id
              text
              receiverName
              receiverId
              senderId
              senderName
              createdAt
              updatedAt
              senderEmoji
              receiverEmoji
              images
              imagesUrl
            }
          }
        `,
        variables: {
          senderId: senderId,
          senderName: senderName,
          receiverId: receiverId,
          receiverName: receiverName,
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
            console.log(response.data);
            dispatch(
              currentMessageSlice.actions.init(response.data.getMessage)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [senderId, senderName, dispatch, receiverId, receiverName]);

  return (
    <div className={styles.rootContainer}>
      <div>{receiverId !== null && <CurrentFriend />}</div>
      <div>{receiverId !== null && <MessageList />}</div>
      <div className={styles.messageInput}>
        <MessageInput searchParams={searchParams} />
      </div>
    </div>
  );
}

export default MessagesBox;
