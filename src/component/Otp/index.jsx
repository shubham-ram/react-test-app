import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

function Otp({ length }) {
  const [optValue, setOtpValue] = useState(new Array(length).fill(""));
  const inputBoxRef = useRef([]);

  const onChangeHandler = ({ value, index }) => {
    setOtpValue((prev) => {
      const newValue = [...prev];
      newValue[index] = value.slice(-1);
      return newValue;
    });

    if (index + 1 < length && value !== "") {
      inputBoxRef.current[index + 1].focus();
    }

    if (value === "") {
      inputBoxRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    inputBoxRef.current[0]?.focus();
  }, []);

  return (
    <div>
      {optValue.map((_, index) => {
        return (
          <input
            key={index}
            className={styles.input_box}
            type="number"
            value={optValue[index]}
            onChange={(e) => {
              onChangeHandler({ value: e.target.value, index });
            }}
            ref={(r) => {
              inputBoxRef.current[index] = r;
            }}
          />
        );
      })}
    </div>
  );
}

Otp.propTypes = {
  length: Number,
};

export default Otp;
