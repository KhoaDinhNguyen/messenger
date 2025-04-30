import { useSelector } from "react-redux";
import { useState } from "react";

import InputButton from "../../../Utils/InputButton/InputButton";
import ClipBoardModal from "../ClipBoardModal/ClipBoardModal";

import {
  CopySVG,
  DobSVG,
  MailSVG,
  PhoneSVG,
  GenderSVG,
} from "../../../../utils/svgConfigs/SVG";

import {
  dobSlice,
  emailSlice,
  genderSlice,
  nameSlice,
  phoneSlice,
  pronounceSlice,
  profileUrlSlice,
} from "../../../../redux/userSlice";

import styles from "./UserDetails.module.css";

function UserDetails() {
  const name = useSelector((state) => state[nameSlice.name]);
  const dob = useSelector((state) => state[dobSlice.name]);
  const gender = useSelector((state) => state[genderSlice.name]);
  const pronounce = useSelector((state) => state[pronounceSlice.name]);
  const email = useSelector((state) => state[emailSlice.name]);
  const phone = useSelector((state) => state[phoneSlice.name]);
  const profileUrl = useSelector((state) => state[profileUrlSlice.name]);
  const [message, setMessage] = useState("");

  const onClickProfileUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    setMessage("Copy to clipboard!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.nameContainer}>
          <p className={styles.name}>{name}</p>
          <div className={styles.profileUrlContainer}>
            <p className={styles.profileUrlText}>{profileUrl}</p>
            <InputButton
              type="button"
              id="profileUrl"
              labelText={<CopySVG />}
              onClickHandler={onClickProfileUrl}
              inputContainer={styles.profileInput}
              labelContainer={styles.profileLabel}
            />
          </div>
        </div>
        <div>
          <div>
            <p className={styles.infoTitle}>Demographic information</p>
          </div>
          <div className={styles.textInfo}>
            <div className={styles.textTitle}>
              <DobSVG />
              <p>Date of birth:</p>
            </div>
            <p>{dob}</p>
          </div>
          <div className={styles.textInfo}>
            <div className={styles.textTitle}>
              <GenderSVG />
              <p>Gender:</p>
            </div>

            <p>
              {gender} <span className={styles.pronounce}>({pronounce})</span>
            </p>
          </div>
        </div>
        <div>
          <div>
            <p className={styles.infoTitle}>Contact information</p>
          </div>
          <div className={styles.textInfo}>
            <div className={styles.textTitle}>
              <MailSVG />
              <p>Email: </p>
            </div>

            {email === "" && <p>Has not been provided</p>}
            {email !== "" && <p>{email}</p>}
          </div>
          <div className={styles.textInfo}>
            <div className={styles.textTitle}>
              <PhoneSVG />
              <p>Phone: </p>
            </div>

            {phone === "" && <p>Has not been provided</p>}
            {phone !== "" && <p>{phone}</p>}
          </div>
        </div>
      </div>
      <ClipBoardModal visible={message !== ""} message={message} />
    </>
  );
}

export default UserDetails;
