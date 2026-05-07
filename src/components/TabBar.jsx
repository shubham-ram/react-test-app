import PropTypes from "prop-types";
import Tab from "./Tab";
import styles from "./TabBar.module.css";

TabBar.propTypes = {
  sheets: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  activeId: PropTypes.string,
  onSwitch: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default function TabBar({
  sheets,
  activeId,
  onSwitch,
  onAdd,
  onDelete,
  onRename,
}) {
  return (
    <div className={styles.tabBar}>
      <button className={styles.addBtn} onClick={onAdd} title="Add sheet">
        +
      </button>
      <div className={styles.tabs}>
        {sheets.map((sheet) => (
          <Tab
            key={sheet.id}
            sheet={sheet}
            isActive={sheet.id === activeId}
            onSwitch={onSwitch}
            onDelete={onDelete}
            onRename={onRename}
            showDelete={sheets.length > 1}
          />
        ))}
      </div>
    </div>
  );
}
