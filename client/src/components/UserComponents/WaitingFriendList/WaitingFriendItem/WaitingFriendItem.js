import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import InputButton from "../../../../components/Utils/InputButton/InputButton";

import { userWaitingFriendsSlice } from "../../../../redux/userSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./WaitingFriendItem.module.css";

function WaitingFriendItem({ friend }) {
  const params = useParams();
  const dispatch = useDispatch();

  const { friendName, friendId, friendImageUrl } = friend;

  const onClickRemoveFriendRequest = async () => {
    const graphQLQuery = {
      query: `
        mutation DropFriendRequest($senderId: String!, $receiverId: String!){
          dropFriendRequest(userInput: {
            senderId: $senderId
            receiverId: $receiverId
          })
        }`,
      variables: {
        senderId: params.userid,
        receiverId: friendId,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    try {
      const jsonResponse = await fetch(process.env.REACT_APP_SERVER_API, {
        method: "POST",
        body: bodyJSON,
        headers: myHeaders,
      });

      const response = await jsonResponse.json();

      //TODO: handler Error

      if (response.data === null) {
      } else {
        dispatch(userWaitingFriendsSlice.actions.removeItem(friendId));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.imageContainer}>
          <img
            src={
              friendImageUrl && friendImageUrl !== ""
                ? friendImageUrl
                : userpublic
            }
            alt="user"
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          {friend.type === "sender" && (
            <p className={styles.text}>
              {friendName} have sent you a friend request
            </p>
          )}
          {friend.type === "receiver" && (
            <p className={styles.text}>
              You have sent a friend request to {friendName}
            </p>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        {friend.type === "receiver" && (
          <InputButton
            type="button"
            valueButton={"Remove"}
            id="removeFriendRequest"
            onClickHandler={onClickRemoveFriendRequest}
            inputContainer={styles.removeInput}
          />
        )}
      </div>
    </div>
  );
}

export default WaitingFriendItem;
