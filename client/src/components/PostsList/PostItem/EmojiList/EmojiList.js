import { formatEmoji } from "../../../../utils/emojiConfigs/format";

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
              <p>&#x1F496; {heartArray.length}</p>
            </div>
          </li>
        )}
        {likeArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F44D; {likeArray.length}</p>
            </div>
          </li>
        )}
        {funnyArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F602; {funnyArray.length}</p>
            </div>
          </li>
        )}
        {cryArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F62D; {cryArray.length}</p>
            </div>
          </li>
        )}
        {angryArray.length > 0 && (
          <li>
            <div className={styles.emojiContainer}>
              <p>&#x1F621; {angryArray.length}</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default EmojiList;
