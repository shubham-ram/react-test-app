import { useAppContext } from "../../context/AppContext";
import pageStore from "../../context/zustandStore";

import styles from "./Content.module.css";

const Content = () => {
  const { content, setContent } = useAppContext();
  const zusContent = pageStore((state) => state.zusContent);
  const setZusContent = pageStore((state) => state.setZusContent);

  console.log("render content");

  return (
    <main className={styles.contentContainer}>
      {content}
      <h2 className={styles.title}>Main Content</h2>
      <p className={styles.description}>
        This is the main content area of the website. You can add your content
        here.
      </p>
      <div className={styles.featuresContainer}>
        <h3 className={styles.featureTitle}>Features</h3>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>Responsive Design</li>
          <li className={styles.featureItem}>Easy to Customize</li>
          <li className={styles.featureItem}>React Components</li>
        </ul>
      </div>
      <input value={content} onChange={(e) => setContent(e.target.value)} />

      <br />
      <label>Zus Content</label>
      <input
        value={zusContent}
        onChange={(e) => setZusContent(e.target.value)}
      />
    </main>
  );
};

export default Content;
