import { useState } from "react";

import ProgressBar from "./component/ProgressBar";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { useRef } from "react";

const progressBarData = [
  { id: 0, isFill: true },
  { id: 1, isFill: false }, //{ id: 1, isFill: true },
  { id: 2, isFill: false }, //{ id: 2, isFill: true },
  { id: 3, isFill: false }, // { { id: 3, isFill: true }}
];

function App() {
  const [progressBar, setProgressBar] = useState(progressBarData);

  const counter = useRef(0);

  useEffect(() => {
    let timeout = setInterval(() => {
      if (counter.current + 1 === progressBar.length) {
        clearInterval(timeout);
        return;
      }

      setProgressBar((prev) => {
        const updated = [...prev];
        updated[counter.current].isFill = true;
        return updated;
      });
      counter.current += 1;
    }, 3000);

    return () => clearInterval(timeout);
  }, [progressBar.length]);

  console.log("progressBar >", progressBar);

  return (
    <div className={styles.container}>
      <button>Add ProgressBar</button>

      {progressBar.map((ele, index) => {
        return <ProgressBar key={ele.id} isFill={ele.isFill} />;
      })}
    </div>
  );
}

export default App;
