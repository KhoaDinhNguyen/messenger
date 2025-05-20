import {
  GitHubSVG2,
  DiscordSVG,
  GmailSVG,
  FacebookSVG,
  InstagramSVG,
} from "../../../../utils/svgConfigs/SVG";

import styles from "./ContactInfo.module.css";

function ContactInfo() {
  return (
    <div className={styles.rootContainer}>
      <div>
        <p className={styles.highlightText}>
          Designed by <span>khoacode1305</span>
        </p>
        <p className={styles.text}>khoacode1305@gmail.com</p>
      </div>
      <div className={styles.contactContainer}>
        <div>
          <a
            href="https://github.com/KhoaDinhNguyen"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubSVG2 />
          </a>
        </div>
        <div>
          <DiscordSVG />
        </div>
        <div>
          <GmailSVG />
        </div>
        <div>
          <FacebookSVG />
        </div>
        <div>
          <InstagramSVG />
        </div>
      </div>
      <div>
        <p className={styles.highlightText}>
          Powered by{" "}
          <span>
            <a href="https://render.com" target="_blank" rel="noreferrer">
              Render
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ContactInfo;
