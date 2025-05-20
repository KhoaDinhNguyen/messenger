import AuthenticationPageList from "./AuthenticatonPageList/AuthenticationPageList";
import HomepageList from "./HomepageList/HomepageList";
import ContactInfo from "./ContactInfo/ContactInfo";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.rootContainer}>
      <div className={styles.listPageContainer}>
        <HomepageList />
        <AuthenticationPageList />
      </div>
      <div>
        <ContactInfo />
      </div>
    </footer>
  );
}

export default Footer;
