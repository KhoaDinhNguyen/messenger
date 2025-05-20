import { Outlet } from "react-router";

import HomepageNavigation from "./HomepageNavigation/HomepageNavigation";
import Footer from "../LandingPage/Footer/Footer";

import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <>
      <HomepageNavigation />
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
