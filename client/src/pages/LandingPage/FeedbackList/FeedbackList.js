import { QuoteSVG } from "../../../utils/svgConfigs/SVG";

import styles from "./FeedbackList.module.css";

function FeedbackList() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.sectionTitleContainer}>
        <h2 className={styles.sectionTitle}>
          See feedback from our satisfied customers
        </h2>
      </div>
      <div className={styles.feedbackList}>
        <div className={styles.feedbackContainer}>
          <div className={styles.svgContainer}>
            <QuoteSVG />
          </div>
          <div>
            <p className={styles.feedbackText}>
              The posting page is great. It is easy for me to share my events
              with my friends, and they love the posts. It is nice to know the
              website.
            </p>
          </div>
        </div>
        <div className={styles.feedbackContainer}>
          <div className={styles.svgContainer}>
            <QuoteSVG />
          </div>
          <div>
            <p className={styles.feedbackText}>
              Recently, I have contacted with my friends who I lost in touch
              five years ago. Thanks to the messenger, we talk to each other
              every day.
            </p>
          </div>
        </div>
        <div className={styles.feedbackContainer}>
          <div className={styles.svgContainer}>
            <QuoteSVG />
          </div>
          <div>
            <p className={styles.feedbackText}>
              I receive the daily notifications very quickly, it helps me to see
              and track my friend's activities easier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackList;
