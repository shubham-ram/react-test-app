import { useAppContext } from "../../context/AppContext";
import styles from "./Header.module.css";
import pageStore from "../../context/zustandStore";

const Header = () => {
  const { header, setHeader } = useAppContext();
  const zusHeader = pageStore((state) => state.zusHeader);
  const setZusHeader = pageStore((state) => state.setZusHeader);

  console.log("render header");

  return (
    <header className={styles.headerContainer}>
      <h1>Welcome to My Website-{header}</h1>
      <nav className={styles.navContainer}>
        <a href="#" className={styles.navLink}>
          Home
        </a>
        <a href="#" className={styles.navLink}>
          About
        </a>
        <a href="#" className={styles.navLink}>
          Contact
        </a>
        <input value={header} onChange={(e) => setHeader(e.target.value)} />

        <br />
        <label>Zus Header</label>
        <input
          value={zusHeader}
          onChange={(e) => setZusHeader(e.target.value)}
        />
      </nav>
    </header>
  );
};

export default Header;
