import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import HomepageNavigation from "../../Homepage/HomepageNavigation/HomepageNavigation";
import UserProfile from "./UserProfile/UserProfile";
import UserNotFound from "../UserNotFound/UserNotFound";

import styles from "./UserPublic.module.css";

function UserPublic({ isAuth }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userid = searchParams.get("userid");
    if (userid === null) {
      setUser("");
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
          id: userid,
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
            setUser("");
          } else {
            setUser(response.data.findUserById);
          }
        })
        .catch((err) => {
          setUser("");
        });
    }
  }, [searchParams]);

  return (
    <>
      <HomepageNavigation />
      <div className={styles.contentContainer}>
        {user !== null && user !== "" && <UserProfile user={user} />}
        {user === "" && <UserNotFound />}
      </div>
    </>
  );
}

export default UserPublic;
