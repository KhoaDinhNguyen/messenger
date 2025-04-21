import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import InputButton from "../../../Utils/InputButton/InputButton";

import {
  nameSlice,
  userWaitingFriendsSlice,
} from "../../../../redux/userSlice";

import userpublic from "../../../../asset/img/userpublic.png";

import styles from "./UserItem.module.css";

function UserItem({ user, isAuth }) {
  const params = useParams();
  const dispatch = useDispatch();

  const senderId = params.userid;
  const senderName = useSelector((state) => state[nameSlice.name]);

  const { _id, name, profileUrl, pronounce } = user;

  const onClickSeeDetails = () => {
    window.open(profileUrl, "_blank");
  };

  const onClickAddFriend = () => {
    const graphQLQuery = {
      query: `
      mutation CreateFriendRequest ($senderId: String!, $senderName: String!, $receiverId: String!, $receiverName: String!) {
        createFriendRequest(userInput:{
          message:"Hello",
          senderId: $senderId,
          senderName: $senderName,
          receiverId: $receiverId,
          receiverName: $receiverName,
        }) {
          _id
          type
          message
          senderId
          senderName
          receiverId
          receiverName
        }
      }`,
      variables: {
        senderId: senderId,
        senderName: senderName,
        receiverId: _id,
        receiverName: name,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaderes = new Headers();
    myHeaderes.append("Content-type", "application/json");

    fetch(process.env.REACT_APP_SERVER_API, {
      method: "POST",
      body: bodyJSON,
      headers: myHeaderes,
    })
      .then((jsonResponse) => jsonResponse.json())
      .then((respnose) => {
        console.log(respnose);
        dispatch(
          userWaitingFriendsSlice.actions.addItem({
            friendId: _id,
            friendName: name,
            type: "receiver",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.rootContainer}>
      <div>
        <img src={userpublic} alt="user" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.title}>{name}</p>
        <p className={styles.pronounce}>{pronounce}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <InputButton
          type={"button"}
          valueButton={"See profile"}
          id={"seeUserProfile"}
          onClickHandler={onClickSeeDetails}
          inputContainer={styles.seeProfileInput}
        />
        {isAuth && (
          <InputButton
            type={"button"}
            valueButton={"Add friend"}
            id={"addFriend"}
            inputContainer={styles.addFriendInput}
            onClickHandler={onClickAddFriend}
          />
        )}
      </div>
    </div>
  );
}

export default UserItem;
