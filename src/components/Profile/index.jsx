import profileFormConfig from "./formConfig";
import styles from "./styles.module.css";

function Profile({ data, onChangeHandler, errors }) {
  return (
    <div>
      <span>Profile</span>

      {profileFormConfig.map((config) => {
        const { name, label, type, placeholder } = config;

        return (
          <div key={name} className={styles.formRow}>
            <label className={styles.label} htmlFor={name}>
              {label}
            </label>

            <input
              id={name}
              type={type}
              value={data?.[name]}
              placeholder={placeholder}
              className={styles.inputField}
              autoComplete="off"
              onChange={(e) => {
                onChangeHandler({
                  name: "profile",
                  formField: name,
                  value: e.target.value,
                });
              }}
            />
            {errors?.[name] ? (
              <p className={styles.error}>{errors?.[name]}</p>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
