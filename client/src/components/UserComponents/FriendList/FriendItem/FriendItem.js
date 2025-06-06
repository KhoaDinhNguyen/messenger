import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { nameSlice } from "../../../../redux/userSlice";
import { latestMessageSlice } from "../../../../redux/messageSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./FriendItem.module.css";

function FriendItem({ friend, setSearchParams, latestMessage }) {
  const params = useParams();
  const dispatch = useDispatch();
  const username = useSelector((state) => state[nameSlice.name]);

  const onClickFriendItem = () => {
    setSearchParams((prev) => {
      prev.set("friendId", friend.friendId);
      prev.set("friendName", friend.friendName);
      prev.set("friendImage", friend.friendImageURL);
      return prev;
    });
    const graphQLQuery = {
      query: `
        mutation UpdateHaveSeenMessages($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!){
          updateHaveSeenMessages(messageInput:{
            senderId: $senderId
            receiverId: $receiverId
            senderName: $senderName
            receiverName: $receiverName
          })
        }
      `,
      variables: {
        senderId: friend.friendId,
        senderName: friend.friendName,
        receiverId: params.userid,
        receiverName: username,
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
            latestMessageSlice.actions.updateHaveSeenMessage({
              senderId: friend.friendId,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const haveNotSeenMessage =
    latestMessage !== null &&
    latestMessage.senderId !== params.userid &&
    latestMessage.haveSeen === false;

  let text = "";

  if (latestMessage !== null && latestMessage.getDeleted === true) {
    text = "Deleted message";
  } else if (latestMessage !== null && latestMessage.text !== "") {
    text = latestMessage.text;
  } else if (
    latestMessage !== null &&
    latestMessage.text === "" &&
    latestMessage.images.length > 0
  ) {
    text = "Send image(s)";
  }

  return (
    <div className={styles.rootContainer} onClick={onClickFriendItem}>
      <div className={styles.identityContainer}>
        <div>
          <img
            src={
              friend.friendImageURL && friend.friendImageURL !== ""
                ? friend.friendImageURL
                : userpublic
            }
            alt="user"
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <p
            className={`${styles.name} ${
              haveNotSeenMessage ? styles.haveNotSeenMessage : ""
            }`}
          >
            {friend.friendName}
          </p>
        </div>
      </div>
      <div className={styles.latestMessageContainer}>
        {latestMessage !== null && (
          <p
            className={`${styles.latestMessage} ${
              haveNotSeenMessage ? styles.haveNotSeenMessage : ""
            }
            ${
              (text === "Send image(s)" && latestMessage.text === ""
                ? styles.sendImages
                : "") ||
              (text === "Deleted message" && latestMessage.getDeleted === true
                ? styles.deletedMessage
                : "")
            }`}
          >
            {params.userid === latestMessage.senderId ? "You: " : ""}
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export default FriendItem;
