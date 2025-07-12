// src/context/ScanContext.jsx
import React, { createContext, useContext } from "react";
import { useScanLogic } from "./ScanLogic"; // ⬅ import moved logic

const ScanContext = createContext();

export function useScan() {
  return useContext(ScanContext);
}

export function ScanProvider({ children }) {
  const contextValue = useScanLogic();

  return (
    <ScanContext.Provider value={contextValue}>
      {children}
    </ScanContext.Provider>
  );
}
