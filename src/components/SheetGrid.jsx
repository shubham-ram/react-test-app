import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { HotTable } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import { emptyGrid } from "../utils/grid";
import { saveSheetData, loadSheetData } from "../utils/storage";
import { SAVE_DEBOUNCE_MS } from "../constants";

registerAllModules();

SheetGrid.propTypes = {
  hotRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  activeIdRef: PropTypes.shape({ current: PropTypes.string }).isRequired,
};

export default function SheetGrid({ hotRef, activeIdRef }) {
  const saveTimerRef = useRef(null);

  // Load initial sheet data once the HotTable is mounted
  useEffect(() => {
    if (!hotRef.current?.hotInstance || !activeIdRef.current) return;
    const data = loadSheetData(activeIdRef.current);
    hotRef.current.hotInstance.loadData(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAfterChange = useCallback(() => {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      if (activeIdRef.current && hotRef.current?.hotInstance) {
        saveSheetData(
          activeIdRef.current,
          hotRef.current.hotInstance.getData(),
        );
      }
    }, SAVE_DEBOUNCE_MS);
  }, [activeIdRef, hotRef]);

  return (
    <HotTable
      ref={hotRef}
      data={emptyGrid()}
      rowHeaders={true}
      colHeaders={true}
      height="auto"
      width="100%"
      autoWrapRow={true}
      autoWrapCol={true}
      contextMenu={true}
      manualColumnResize={true}
      manualRowResize={true}
      afterChange={handleAfterChange}
      afterCreateRow={handleAfterChange}
      afterRemoveRow={handleAfterChange}
      afterCreateCol={handleAfterChange}
      afterRemoveCol={handleAfterChange}
      licenseKey="non-commercial-and-evaluation"
      themeName="ht-theme-main"
    />
  );
}
