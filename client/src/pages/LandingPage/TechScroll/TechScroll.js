import {
  HTMLSVG,
  CSSSVG,
  JSSVG,
  ReactSVG,
  ReactRouterSVG,
  ReduxSVG,
  NodeJSSVG,
  ExpressSVG,
  GraphQLSVG,
  RESTAPISVG,
  MongoDBSVG,
  AmazonS3SVG,
  NpmSVG,
  GitSVG,
  GitHubSVG,
} from "../../../utils/svgConfigs/SVG";

import styles from "./TechScroll.module.css";

function TechScroll({ isReverse }) {
  return (
    <div className={styles.rootContainer}>
      <ul
        className={`${styles.listTech} ${isReverse ? styles.reverseList : ""}`}
      >
        <li>
          <div className={styles.techLogo}>
            <HTMLSVG />
            <p>HTML</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <CSSSVG />
            <p>CSS</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <JSSVG />
            <p>JavaScript</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ReactSVG />
            <p>React</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ReactRouterSVG />
            <p>React Router</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ReduxSVG />
            <p>Redux</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <NodeJSSVG />
            <p>Node.js</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ExpressSVG />
            <p>Express.js</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <RESTAPISVG />
            <p>REST API</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <GraphQLSVG />
            <p>GraphQL</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <MongoDBSVG />
            <p>MongoDB + Mongoose</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <AmazonS3SVG />
            <p>Amazon S3</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <NpmSVG />
            <p>Npm</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <GitSVG />
            <p>Git</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <GitHubSVG />
            <p>GitHub</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <HTMLSVG />
            <p>HTML</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <CSSSVG />
            <p>CSS</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <JSSVG />
            <p>JavaScript</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ReactSVG />
            <p>React</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ReactRouterSVG />
            <p>React Router</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ReduxSVG />
            <p>Redux</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <NodeJSSVG />
            <p>Node.js</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <ExpressSVG />
            <p>Express.js</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <RESTAPISVG />
            <p>REST API</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <GraphQLSVG />
            <p>GraphQL</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <MongoDBSVG />
            <p>MongoDB + Mongoose</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <AmazonS3SVG />
            <p>Amazon S3</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <NpmSVG />
            <p>Npm</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <GitSVG />
            <p>Git</p>
          </div>
        </li>
        <li>
          <div className={styles.techLogo}>
            <GitHubSVG />
            <p>GitHub</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TechScroll;
