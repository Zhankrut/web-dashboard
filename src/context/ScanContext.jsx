// src/context/ScanContext.jsx
import React, { createContext, useContext, useMemo } from "react";
import { useScanLogic } from "./ScanLogic";

const ScanContext = createContext(null);

/**
 * Hook to use the scan context anywhere in the app.
 */
export function useScan() {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error("useScan must be used within a ScanProvider");
  }
  return context;
}

/**
 * Provides scanning state and controls to child components.
 */
export function ScanProvider({ children }) {
  const scanLogic = useScanLogic();

  // useMemo ensures stable context reference, preventing unnecessary re-renders
  const contextValue = useMemo(() => scanLogic, [scanLogic]);

  return (
    <ScanContext.Provider value={contextValue}>
      {children}
    </ScanContext.Provider>
  );
}
