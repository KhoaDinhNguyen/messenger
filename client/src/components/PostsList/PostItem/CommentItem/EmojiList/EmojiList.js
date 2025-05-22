import { formatEmoji } from "../../../../../utils/emojiConfigs/format";

import styles from "./EmojiList.module.css";

function EmojiList({ emojiList }) {
  const { heartArray, likeArray, funnyArray, cryArray, angryArray } =
    formatEmoji(emojiList);
  return (
    <div className={styles.rootContainer}>
      <ul className={styles.emojiList}>
        {heartArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F496;</p>
            </div>
          </li>
        )}
        {likeArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F44D;</p>
            </div>
          </li>
        )}
        {funnyArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F602;</p>
            </div>
          </li>
        )}
        {cryArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F62D;</p>
            </div>
          </li>
        )}
        {angryArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F621;</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default EmojiList;
