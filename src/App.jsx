import { useRef } from "react";
import SheetGrid from "./components/SheetGrid";
import TabBar from "./components/TabBar";
import { useSheets } from "./hooks/useSheets";
import styles from "./App.module.css";
import { SHEET_DATA_PREFIX } from "./constants";
export default function App() {
  const hotRef = useRef(null);
  const {
    sheets,
    activeId,
    activeIdRef,
    switchSheet,
    addSheet,
    deleteSheet,
    renameSheet,
  } = useSheets(hotRef);

  return (
    <div className={styles.root}>
      <div className={styles.gridWrapper}>
        <SheetGrid hotRef={hotRef} activeIdRef={activeIdRef} />
      </div>

      <TabBar
        sheets={sheets}
        activeId={activeId}
        onSwitch={switchSheet}
        onAdd={() => addSheet(sheets)}
        onDelete={(id) => deleteSheet(id, sheets, activeId)}
        onRename={(id, label) => renameSheet(id, label, sheets)}
      />

      <button
        onClick={() => {
          sheets.forEach((sheet, i) => {
            const raw = localStorage.getItem(SHEET_DATA_PREFIX + sheet.id);
            const data = raw ? JSON.parse(raw) : "";
            console.log("data >>", i, data);
          });
        }}
      >
        get sheet data
      </button>
    </div>
  );
}
