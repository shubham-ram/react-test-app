import { DEFAULT_ROWS, DEFAULT_COLS } from "../constants";

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyGrid(rows = DEFAULT_ROWS, cols = DEFAULT_COLS) {
  return Array.from({ length: rows }, () => Array(cols).fill(""));
}
