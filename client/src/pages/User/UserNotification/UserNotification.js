import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import NotificationList from "../../../components/UserComponents/NotificationList/NotificationList";

import { notificationListSlice } from "../../../redux/notificationSlice";

import styles from "./UserNotification.module.css";

function UserNotification() {
  const dispatch = useDispatch();
  const params = useParams();

  const notificationsList = useSelector(
    (state) => state[notificationListSlice.name]
  );

  useEffect(() => {
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
  }, [dispatch, params.userid]);

  return (
    <div className={styles.rootContainer}>
      {notificationsList.length > 0 && (
        <>
          <p>You have {notificationsList.length} notification(s)</p>
          <div className={styles.notificationsContainer}>
            <NotificationList notificationsList={notificationsList} />
          </div>
        </>
      )}
      {notificationsList.length === 0 && (
        <p>You do not have any notifications</p>
      )}
    </div>
  );
}

export default UserNotification;
