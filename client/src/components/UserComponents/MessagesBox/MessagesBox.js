import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import CurrentFriend from "./CurrentFriend/CurrentFriend";
import PermanentDeleteModal from "./MessageItem/PermanentDeleteModal/PermanentDeleteModal";

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
  const [replyMessage, setReplyMessage] = useState(null);
  const [permanentDeleteModal, setPermanentDeleteModal] = useState(false);
  const [chosenMessage, setChosenMessage] = useState(null);

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
              replyOf
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
          if (response.data === undefined) {
          } else {
            dispatch(
              currentMessageSlice.actions.init(response.data.getMessage)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setReplyMessage(null);
  }, [senderId, senderName, dispatch, receiverId, receiverName]);

  const onClickOpenPermantDeleteModal = (chosenMessage) => {
    setPermanentDeleteModal((prevState) => true);
    setChosenMessage((prevState) => chosenMessage);
  };

  const onClickClosePermantDeleteModal = () => {
    setPermanentDeleteModal((prevState) => false);
    setChosenMessage((prevState) => null);
  };

  return (
    <>
      <div className={styles.rootContainer}>
        <div>{receiverId !== null && <CurrentFriend />}</div>
        <div>
          {receiverId !== null && (
            <MessageList
              setReplyMessage={setReplyMessage}
              onClickOpenPermantDeleteModal={onClickOpenPermantDeleteModal}
            />
          )}
        </div>
        <div className={styles.messageInput}>
          <MessageInput
            searchParams={searchParams}
            replyMessage={replyMessage}
            setReplyMessage={setReplyMessage}
          />
        </div>
      </div>
      <PermanentDeleteModal
        visible={permanentDeleteModal}
        chosenMessage={chosenMessage}
        onClickClosePermantDeleteModal={onClickClosePermantDeleteModal}
      />
    </>
  );
}

export default MessagesBox;
