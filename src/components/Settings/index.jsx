import settingsFormConfig from "./formConfig";
import styles from "./styles.module.css";

function Settings({ data, onChangeHandler, errors }) {
  return (
    <div>
      <span>Settings</span>

      {settingsFormConfig.map((config) => {
        const { name, label, type, options } = config;

        return (
          <div key={name} className={styles.formRow}>
            <span htmlFor={name}>{label}</span>

            <div className={styles.optionContainer}>
              {options.map((option) => {
                return (
                  <div key={option.value}>
                    <input
                      id={option.value}
                      type={type}
                      name={name}
                      value={option.value}
                      checked={data?.[name] === option.value}
                      onChange={(e) => {
                        onChangeHandler({
                          name: "settings",
                          formField: name,
                          value: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor={option.value} className={styles.label}>
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>

            {errors?.[name] ? (
              <p className={styles.error}>{errors?.[name]}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default Settings;
