import { useNavigate } from "react-router";

import FeaturePage from "./FeaturePage/FeaturePage";
import InputButton from "../../components/Utils/InputButton/InputButton";
import LandingPageNavigation from "./LandingPageNavigation/LandingPageNavigation";
import ScrollWatcher from "./ScrollWatcher/ScrollWatcher";
import Footer from "./Footer/Footer";

import messenger from "../../../src/asset/img/messenger2.png";

import styles from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate("./home/login");
  };

  const onClickGoToContact = () => {
    navigate("./contact");
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.rootContainer}>
      <ScrollWatcher />
      <div className={styles.rootContent}>
        <div className={styles.contentContainer}>
          <LandingPageNavigation />

          <div className={`${styles.introSection} ${styles.section}`}>
            <div className={styles.introContent}>
              <div className={styles.sectionTitleContainer}>
                <h2 className={styles.sectionTitle}>
                  Connect with your friends around the world
                </h2>
              </div>
              <div>
                <InputButton
                  id={"getStart"}
                  type={"button"}
                  valueButton={""}
                  labelText={<p className={styles.labelText}>Get started</p>}
                  onClickHandler={onClickGoToLogin}
                  inputContainer={styles.getStartInput}
                  labelContainer={styles.getStartLabel}
                  rootContainer={styles.getStartButton}
                />
              </div>
              <div className={styles.imageContainer}>
                <img src={messenger} alt="messenger" className={styles.image} />
              </div>
            </div>
          </div>
          <FeaturePage />
          <div className={styles.contactSection}>
            <div className={styles.contactContent}>
              <div>
                <h2 className={styles.contactTitle}>
                  Have trouble or feedback? Feel free to contact us.
                </h2>
              </div>
              <InputButton
                id={"contactUs"}
                type={"button"}
                valueButton={""}
                labelText={<p className={styles.labelText}>Contact Us</p>}
                onClickHandler={onClickGoToContact}
                inputContainer={styles.contactInput}
                labelContainer={styles.contactLabel}
                rootContainer={styles.contactButton}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
