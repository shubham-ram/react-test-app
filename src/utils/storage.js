import { SHEETS_META_KEY, SHEET_DATA_PREFIX } from "../constants";
import { emptyGrid } from "./grid";

export function loadMeta() {
  try {
    const raw = localStorage.getItem(SHEETS_META_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveMeta(meta) {
  localStorage.setItem(SHEETS_META_KEY, JSON.stringify(meta));
}

export function loadSheetData(id) {
  try {
    const raw = localStorage.getItem(SHEET_DATA_PREFIX + id);
    console.log("raw data id", raw, "json", JSON.parse(raw));
    return raw ? JSON.parse(raw) : emptyGrid();
  } catch {
    return emptyGrid();
  }
}

export function saveSheetData(id, data) {
  localStorage.setItem(SHEET_DATA_PREFIX + id, JSON.stringify(data));
}

export function deleteSheetData(id) {
  localStorage.removeItem(SHEET_DATA_PREFIX + id);
}
