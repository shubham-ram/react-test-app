import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Tab.module.css";

Tab.propTypes = {
  sheet: PropTypes.shape({ id: PropTypes.string, label: PropTypes.string }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onSwitch: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
};

export default function Tab({ sheet, isActive, onSwitch, onDelete, onRename, showDelete }) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(sheet.label);

  function startEdit(e) {
    e.stopPropagation();
    setLabel(sheet.label);
    setEditing(true);
  }

  function commitRename() {
    const trimmed = label.trim();
    if (trimmed && trimmed !== sheet.label) {
      onRename(sheet.id, trimmed);
    }
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") commitRename();
    if (e.key === "Escape") setEditing(false);
  }

  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : ""}`}
      onClick={() => onSwitch(sheet.id)}
      onDoubleClick={startEdit}
    >
      {editing ? (
        <input
          className={styles.renameInput}
          value={label}
          autoFocus
          onChange={(e) => setLabel(e.target.value)}
          onBlur={commitRename}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className={styles.label}>{sheet.label}</span>
      )}
      {showDelete && (
        <span
          className={styles.closeBtn}
          onClick={(e) => { e.stopPropagation(); onDelete(sheet.id); }}
          title="Delete sheet"
        >
          ×
        </span>
      )}
    </div>
  );
}
