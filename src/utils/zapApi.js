// utils/zapApi.js
export const BASE_URL = "/zap";
export const API_KEY = import.meta.env.VITE_ZAP_API_KEY;

export function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol.startsWith("http");
  } catch {
    return false;
  }
}

export function getElapsedTime(startTime) {
  const start = new Date(startTime);
  const now = new Date();
  const diff = now - start;
  const seconds = (diff / 1000).toFixed(3);
  const minutes = Math.floor(seconds / 60);
  const remSeconds = (seconds % 60).toFixed(3).padStart(6, "0");
  return `00:${String(minutes).padStart(2, "0")}:${remSeconds}`;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
