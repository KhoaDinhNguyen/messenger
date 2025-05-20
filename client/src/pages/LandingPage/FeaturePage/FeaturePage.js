import {
  GlobalSVG,
  RealTimeSVG,
  DynamicSVG,
  FriendlyInterfaceSVG,
  SaveMoneySVG,
  SecuritySVG,
  SettingSVG,
  EvolutionSVG,
} from "../../../utils/svgConfigs/SVG";

import TechScroll from "../TechScroll/TechScroll";

import post from "../../../../src/asset/img/post.png";
import messenger from "../../../../src/asset/img/messenger.png";
import notification from "../../../../src/asset/img/notification.png";

import styles from "./FeaturePage.module.css";

function FeaturePage() {
  return (
    <div>
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>What we use</h2>
        </div>
        <div className={styles.techScroll}>
          <TechScroll isReverse={false} />
        </div>
        <div className={styles.techScroll}>
          <TechScroll isReverse={true} />
        </div>
      </section>
      <section className={styles.section}>
        <FeatureSection />
      </section>
      <section className={styles.section}>
        <PropertySection />
      </section>
    </div>
  );
}

export default FeaturePage;

function FeatureSection() {
  return (
    <div className={styles.featureSection}>
      <div className={styles.featureContent}>
        <div className={styles.featureSectionTitleContainer}>
          <h2 className={styles.sectionTitle}>
            Powerful features for application success
          </h2>
        </div>
        <div className={styles.featureList}>
          <div className={styles.featureContainer}>
            <div className={styles.featureInfo}>
              <h3 className={styles.featureTitle}>Messenger</h3>
              <p className={styles.featureText}>
                Connect with your relatives and friends by sending them daily
                messages.
              </p>
            </div>
            <div className={styles.featureImageContainer}>
              <img
                src={messenger}
                alt="messenger"
                className={styles.messengerImage}
              />
            </div>
          </div>
          <div className={styles.featureContainer}>
            <div className={styles.featureInfo}>
              <h3 className={styles.featureTitle}>Posts</h3>
              <p className={styles.featureText}>
                Share your beautiful day with everyone by posting interesting
                updates.
              </p>
            </div>
            <div className={styles.featureImageContainer}>
              <img src={post} alt="post" className={styles.image} />
            </div>
          </div>
          <div className={styles.featureContainer}>
            <div className={styles.featureInfo}>
              <h3 className={styles.featureTitle}>Notification</h3>
              <p className={styles.featureText}>
                Stay updated with helpful notifications about your friends'
                activities.
              </p>
            </div>
            <div className={styles.featureImageContainer}>
              <img
                src={notification}
                alt="notification"
                className={styles.notificationImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertySection() {
  return (
    <div className={styles.propertySection}>
      <div className={styles.propertyContent}>
        <div className={styles.propertySectionTitleContainer}>
          <h2 className={styles.sectionTitle}>
            Powerful properties for application success
          </h2>
        </div>
        <div className={styles.properties}>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <GlobalSVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>Global Network</p>
              <p className={styles.propertyText}>
                Connect with other users at any distance and time.
              </p>
            </div>
          </div>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <RealTimeSVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>Real-Time Messages</p>
              <p className={styles.propertyText}>
                Receive messages quickly at the same time they are sent.
              </p>
            </div>
          </div>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <DynamicSVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>Dynamic Contents</p>
              <p className={styles.propertyText}>
                Send text, images, emoji, whatever you like.
              </p>
            </div>
          </div>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <SaveMoneySVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>No-Cost Application</p>
              <p className={styles.propertyText}>
                Pay no fee when using the application.
              </p>
            </div>
          </div>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <SettingSVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>Customizable settings</p>
              <p className={styles.propertyText}>
                Change the settings for your profile, posts.
              </p>
            </div>
          </div>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <FriendlyInterfaceSVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>Friendly interface</p>
              <p className={styles.propertyText}>
                Adapt users' resolution on any device.
              </p>
            </div>
          </div>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <EvolutionSVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>Continous Evolution</p>
              <p className={styles.propertyText}>
                Continue to update the app based on users' feedback.
              </p>
            </div>
          </div>
          <div className={styles.propertyContainer}>
            <div className={styles.propertyImage}>
              <SecuritySVG />
            </div>
            <div>
              <p className={styles.propertyTitle}>High Security</p>
              <p className={styles.propertyText}>
                Protect your accounts and information from other users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
