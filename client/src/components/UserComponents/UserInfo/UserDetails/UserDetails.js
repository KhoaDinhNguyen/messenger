import { useSelector } from "react-redux";

import {
  dobSlice,
  emailSlice,
  genderSlice,
  nameSlice,
  phoneSlice,
  pronounceSlice,
} from "../../../../redux/userSlice";

import styles from "./UserDetails.module.css";

function UserDetails() {
  const name = useSelector((state) => state[nameSlice.name]);
  const dob = useSelector((state) => state[dobSlice.name]);
  const gender = useSelector((state) => state[genderSlice.name]);
  const pronounce = useSelector((state) => state[pronounceSlice.name]);
  const email = useSelector((state) => state[emailSlice.name]);
  const phone = useSelector((state) => state[phoneSlice.name]);

  return (
    <div>
      <div className={styles.textInfo}>
        <p>Name:</p>
        <p>{name}</p>
      </div>
      <div className={styles.textInfo}>
        <p>Date of birth:</p>
        <p>{dob}</p>
      </div>
      <div className={styles.textInfo}>
        <p>Gender:</p>
        <p>{gender}</p>
      </div>
      <div className={styles.textInfo}>
        <p>Pronounce: </p>
        <p>{pronounce}</p>
      </div>
      <div className={styles.textInfo}>
        <p>Email: </p>
        {email === "" && <p>Has not been provided</p>}
        {email !== "" && <p>{email}</p>}
      </div>
      <div className={styles.textInfo}>
        <p>Phone: </p>
        {phone === "" && <p>Has not been provided</p>}
        {phone !== "" && <p>{phone}</p>}
      </div>
    </div>
  );
}

export default UserDetails;
