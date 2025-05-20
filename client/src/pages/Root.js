import { Outlet } from "react-router";
import LandingPageNavigation from "./LandingPage/LandingPageNavigation/LandingPageNavigation";
import Footer from "./LandingPage/Footer/Footer";

import styles from "./Root.module.css";

function Root() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.contentContainer}>
        <LandingPageNavigation />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
