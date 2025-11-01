import { useAppContext } from "../../context/AppContext";
import pageStore, { setZusFooter } from "../../context/zustandStore";
import styles from "./Footer.module.css";

const Footer = () => {
  const { footer, setFooter } = useAppContext();
  const zusFooter = pageStore((state) => state.zusFooter);

  console.log("render footer");

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {footer}
        <p className={styles.copyright}>
          &copy; 2025 My Website. All rights reserved.
        </p>
        <input value={footer} onChange={(e) => setFooter(e.target.value)} />

        <br />
        <label>Zus Footer</label>
        <input
          value={zusFooter}
          onChange={(e) => setZusFooter(e.target.value)}
        />
      </div>
    </footer>
  );
};

export default Footer;
