import interestFormConfig from "./formConfig";
import styles from "./styles.module.css";

function Interest({ data, onChangeHandler, errors }) {
  return (
    <div>
      <span>Interest</span>

      {interestFormConfig.map((config) => {
        const { name, type, options } = config;

        return (
          <div key={name}>
            {options.map((option) => (
              <div key={option.value} className={styles.formRow}>
                <input
                  id={option.value}
                  type={type}
                  className={styles.inputField}
                  autoComplete="off"
                  checked={data?.[name]}
                  onChange={(e) => {
                    onChangeHandler({
                      name: "interest",
                      formField: option.value,
                      value: e.target.checked,
                    });
                  }}
                />
                <label className={styles.label} htmlFor={option.value}>
                  {option.label}
                </label>
              </div>
            ))}
            {errors?.[name] ? (
              <p className={styles.error}>{errors?.[name]}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default Interest;
