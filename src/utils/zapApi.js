// ✅ zapApi.js (utils/zapApi.js)
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

// Future utils (optional): fetchAlerts, fetchSentMessages, etc.
