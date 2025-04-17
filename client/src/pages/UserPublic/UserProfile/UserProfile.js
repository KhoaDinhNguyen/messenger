import userpublic from "../../../asset/img/userpublic.png";

import styles from "./UserProfile.module.css";

function UserProfile({ user }) {
  console.log(user);
  const { name, dob, pronounce, email, phone, friend } = user;
  return (
    <div className={styles.rootContainer}>
      <div className={styles.imageContainer}>
        <img src={userpublic} alt="User" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.pronounce}>{pronounce} </p>
        </div>
        <div className={styles.subInfoContainers}>
          <div className={styles.subInfoContainer}>
            <p>Date of birth:</p>
            <p>{dob}</p>
          </div>
          <div className={styles.subInfoContainer}>
            <p>Email: </p>
            <p>{email}</p>
          </div>
          <div className={styles.subInfoContainer}>
            <p>Phone: </p>
            <p>{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
