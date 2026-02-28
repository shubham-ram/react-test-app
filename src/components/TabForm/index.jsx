import { useState } from "react";
import styles from "./styles.module.css";

function TabForm({ tabConfig = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setError] = useState({});

  const {
    component: ActiveComponent,
    componentProps,
    validate,
  } = tabConfig[activeTab];

  const onTabChangeHandler = (value) => {
    const err = validate();
    setError(err);
    if (!Object.keys(err).length) {
      setActiveTab(value);
    }
  };

  const onSubmitHandler = () => {
    const err = validate();
    setError(err);
    if (!Object.keys(err).length) {
      alert("Form submitted");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {tabConfig.map((tab, index) => {
          const { label, value } = tab || {};
          return (
            <button
              key={value}
              className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""} `}
              onClick={() => {
                onTabChangeHandler(index);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className={styles.activeContainer}>
        <ActiveComponent {...componentProps} errors={errors} />
      </div>

      {activeTab !== 0 && (
        <button
          onClick={() => {
            onTabChangeHandler(activeTab - 1);
          }}
        >
          Previous
        </button>
      )}
      {activeTab !== tabConfig.length - 1 ? (
        <button
          onClick={() => {
            onTabChangeHandler(activeTab + 1);
          }}
        >
          Next
        </button>
      ) : (
        <button onClick={onSubmitHandler}>Submit</button>
      )}
    </div>
  );
}

export default TabForm;
