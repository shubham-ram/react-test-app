import { useState, useCallback, useRef } from "react";
import { generateId, emptyGrid } from "../utils/grid";
import {
  loadMeta,
  saveMeta,
  loadSheetData,
  saveSheetData,
  deleteSheetData,
} from "../utils/storage";

export function useSheets(hotRef) {
  const [sheets, setSheets] = useState(() => {
    let meta = loadMeta();
    if (!meta || meta.length === 0) {
      const id = generateId();
      meta = [{ id, label: "Sheet 1" }];
      saveMeta(meta);
      saveSheetData(id, emptyGrid());
    }
    return meta;
  });

  const [activeId, setActiveId] = useState(() => {
    const meta = loadMeta();
    return meta?.[0]?.id ?? null;
  });

  const activeIdRef = useRef(activeId);

  const flushSave = useCallback(() => {
    if (activeIdRef.current && hotRef.current?.hotInstance) {
      saveSheetData(activeIdRef.current, hotRef.current.hotInstance.getData());
    }
  }, [hotRef]);

  const switchSheet = useCallback(
    (id) => {
      if (id === activeIdRef.current) return;
      flushSave();
      activeIdRef.current = id;
      setActiveId(id);
      const data = loadSheetData(id);
      hotRef.current.hotInstance.loadData(data);
    },
    [flushSave, hotRef],
  );

  const addSheet = useCallback(
    (currentSheets) => {
      flushSave();

      const id = generateId();
      const label = `Sheet ${currentSheets.length + 1}`;
      const newMeta = [...currentSheets, { id, label }];
      saveSheetData(id, emptyGrid());
      saveMeta(newMeta);
      setSheets(newMeta);

      activeIdRef.current = id;
      setActiveId(id);

      hotRef.current.hotInstance.loadData(emptyGrid());
    },
    [flushSave, hotRef],
  );

  const deleteSheet = useCallback(
    (id, currentSheets, currentActiveId) => {
      if (currentSheets.length === 1) return;
      const idx = currentSheets.findIndex((s) => s.id === id);
      const newMeta = currentSheets.filter((s) => s.id !== id);
      deleteSheetData(id);
      saveMeta(newMeta);
      setSheets(newMeta);

      if (id === currentActiveId) {
        const nextId = newMeta[Math.min(idx, newMeta.length - 1)].id;
        activeIdRef.current = nextId;
        setActiveId(nextId);
        hotRef.current.hotInstance.loadData(loadSheetData(nextId));
      }
    },
    [hotRef],
  );

  const renameSheet = useCallback((id, label, currentSheets) => {
    const newMeta = currentSheets.map((s) =>
      s.id === id ? { ...s, label } : s,
    );
    saveMeta(newMeta);
    setSheets(newMeta);
  }, []);

  return {
    sheets,
    activeId,
    activeIdRef,
    flushSave,
    switchSheet,
    addSheet,
    deleteSheet,
    renameSheet,
  };
}
