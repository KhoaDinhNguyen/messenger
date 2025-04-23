import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import userpublic from "../../../asset/img/userpublic.png";

import styles from "./FriendInfo.module.css";

function FriendInfo() {
  const [searchParams] = useSearchParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = searchParams.get("friendId");
    if (friendId === null) {
      setFriend("");
    } else {
      const graphQLQuery = {
        query: `query FindUserById($id: String!) {
          findUserById(userInput:{id: $id}) {
            name,
            dob,
            pronounce,
            email,
            phone,
          }
        }`,
        variables: {
          id: friendId,
        },
      };

      const bodyJSON = JSON.stringify(graphQLQuery);
      const myHeader = new Headers();
      myHeader.append("Content-type", "application/json");

      fetch(process.env.REACT_APP_SERVER_API, {
        method: "POST",
        body: bodyJSON,
        headers: myHeader,
      })
        .then((jsonResponse) => jsonResponse.json())
        .then((response) => {
          if (response.data === null) {
            setFriend("");
          } else {
            setFriend(response.data.findUserById);
          }
        })
        .catch((err) => {
          setFriend("");
        });
    }
  }, [searchParams]);

  if (friend === null) {
    return <></>;
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <img src={userpublic} alt="User" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.nameContainer}>
            <p className={styles.name}>{friend.name}</p>
            <p className={styles.pronounce}>{friend.pronounce} </p>
          </div>
          <div className={styles.subInfoContainers}>
            <div className={styles.subInfoContainer}>
              <p>Date of birth:</p>
              <p>{friend.dob}</p>
            </div>
            <div className={styles.subInfoContainer}>
              <p>Email: </p>
              <p>{friend.email}</p>
            </div>
            <div className={styles.subInfoContainer}>
              <p>Phone: </p>
              <p>{friend.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendInfo;
