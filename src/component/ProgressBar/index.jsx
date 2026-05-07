import styles from "./styles.module.css";

function ProgressBar({ isFill }) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.progress} ${isFill ? styles.fillProgressBar : ""}`}
      ></div>
    </div>
  );
}

export default ProgressBar;
