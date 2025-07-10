import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const ScanContext = createContext();

export function useScan() {
  return useContext(ScanContext);
}

export function ScanProvider({ children }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [pluginProgressData, setPluginProgressData] = useState([]);
  const [scanStatus, setScanStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const pollingRef = useRef(true);

  const API_KEY = import.meta.env.VITE_ZAP_API_KEY;
  const BASE_URL = "/zap";

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const startScan = async () => {
    if (!isValidUrl(targetUrl)) {
      setScanStatus("Please enter a valid URL including http/https.");
      return;
    }

    setLoading(true);
    setScanProgress(0);
    setAlerts([]);
    setSentMessages([]);
    pollingRef.current = true;

    try {
      const spiderResp = await fetch(
        `${BASE_URL}/spider/action/scan/?url=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`
      );
      const spiderData = await spiderResp.json();
      await pollSpiderStatus(spiderData.scan);

      const activeResp = await fetch(
        `${BASE_URL}/ascan/action/scan/?url=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`
      );
      const activeData = await activeResp.json();

      if (activeData.scan) {
        await pollScanStatus(activeData.scan);
      }

      setScanStatus(`Scan completed for ${targetUrl}`);
    } catch (error) {
      setScanStatus(`Error starting scan: ${error.message}`);
    }

    setLoading(false);
  };

  const stopScan = async () => {
    pollingRef.current = false;
    setLoading(false);
    setScanStatus("Scan stopped by user.");

    try {
      await fetch(`${BASE_URL}/ascan/action/stop/?apikey=${API_KEY}`);
      await fetch(`${BASE_URL}/spider/action/stop/?apikey=${API_KEY}`);

      await fetchAlerts();
      const msgs = await fetchSentMessages();
      setSentMessages(msgs);
    } catch (error) {
      setScanStatus(`Error stopping scan: ${error.message}`);
    }
  };

  const pollSpiderStatus = async (scanId) => {
    let status = "0";
    while (status !== "100" && pollingRef.current) {
      await new Promise((res) => setTimeout(res, 500));
      const resp = await fetch(`${BASE_URL}/spider/view/status/?scanId=${scanId}&apikey=${API_KEY}`);
      status = (await resp.json()).status;
    }
  };

  const pollScanStatus = async (scanId) => {
    let status = "0";

    while (status !== "100" && pollingRef.current) {
      await new Promise((res) => setTimeout(res, 1000));
      const resp = await fetch(`${BASE_URL}/ascan/view/status/?scanId=${scanId}&apikey=${API_KEY}`);
      status = (await resp.json()).status;
      setScanProgress(Number(status));

      const plugins = await fetchPluginProgress();
      setPluginProgressData(plugins);

      const msgs = await fetchSentMessages();
      setSentMessages(msgs);
    }

    if (pollingRef.current) {
      setScanProgress(100);
      await fetchAlerts();
      await fetchSentMessages();
    }
  };

  const fetchAlerts = async () => {
    try {
      const resp = await fetch(
        `${BASE_URL}/core/view/alerts/?baseurl=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`
      );
      const data = await resp.json();
      setAlerts(data.alerts || []);
      setScanStatus(`Found ${data.alerts?.length || 0} alerts.`);
      return data.alerts || [];
    } catch (error) {
      setScanStatus(`Error fetching alerts: ${error.message}`);
      return [];
    }
  };

  const fetchPluginProgress = async () => {
    try {
      const response = await fetch(`${BASE_URL}/ascan/view/scanners/?apikey=${API_KEY}`);
      const json = await response.json();
      const scanners = json.scanners || [];
      return scanners.map((scanner) => ({
        id: scanner.id,
        name: scanner.name,
        strength: scanner.attackStrength || "-",
        progress: parseInt(scanner.progress),
        elapsed: scanner.timeStarted ? getElapsedTime(scanner.timeStarted) : "-",
        requests: scanner.requests || 0,
        alerts: scanner.alertsRaised || 0,
        status: scanner.progress >= 100 ? "✅ Done" : "⏳ Running",
      }));
    } catch {
      return [];
    }
  };

  const fetchSentMessages = async () => {
    try {
      const resp = await fetch(
        `${BASE_URL}/core/view/messages/?baseurl=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`
      );
      const data = await resp.json();
      const messages = data.messages || [];
      const detailedMessages = await Promise.all(
        messages.map(async (msg) => {
          try {
            const msgResp = await fetch(`${BASE_URL}/core/view/message/?id=${msg.id}&apikey=${API_KEY}`);
            const msgData = await msgResp.json();
            return {
              id: msg.id,
              timeSent: msgData.message.timeSent,
              timeReceived: msgData.message.timeReceived,
              method: msgData.message.requestHeader?.split(" ")[0] || "-",
              url: msgData.message.requestHeader?.split(" ")[1] || "-",
              statusCode: msgData.message.responseHeader?.match(/HTTP\/\d\.\d (\d{3})/)?.[1] || "-",
              reasonPhrase: msgData.message.responseHeader?.match(/HTTP\/\d\.\d \d{3} (.+)/)?.[1] || "-",
              rtt: msgData.message.rtt,
              responseHeader: msgData.message.responseHeader,
              responseBody: msgData.message.responseBody,
            };
          } catch {
            return { id: msg.id };
          }
        })
      );
      return detailedMessages;
    } catch {
      return [];
    }
  };

  const getElapsedTime = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = now - start;
    const seconds = (diff / 1000).toFixed(3);
    const minutes = Math.floor(seconds / 60);
    const remSeconds = (seconds % 60).toFixed(3).padStart(6, "0");
    return `00:${String(minutes).padStart(2, "0")}:${remSeconds}`;
  };

  useEffect(() => {
    return () => {
      pollingRef.current = false;
    };
  }, []);

  return (
    <ScanContext.Provider
      value={{
        targetUrl,
        setTargetUrl,
        scanProgress,
        alerts,
        sentMessages,
        pluginProgressData,
        scanStatus,
        loading,
        startScan,
        stopScan,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
}
