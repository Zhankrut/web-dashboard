// src/context/ScanLogic.js
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import {
  BASE_URL,
  API_KEY,
  isValidUrl,
  getElapsedTime,
  delay,
} from "../utils/zapApi";
import pLimit from "p-limit";

export function useScanLogic() {
  const [targetUrl, setTargetUrl] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [pluginProgressData, setPluginProgressData] = useState([]);
  const [scanStatus, setScanStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const pollingRef = useRef(true);

  const startScan = async () => {
    if (!isValidUrl(targetUrl)) {
      toast.error("❌ Please enter a valid URL including http/https.");
      setScanStatus("Invalid URL");
      return;
    }

    toast.info(`🚀 Scan started for ${targetUrl}`);
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

      toast.success(`✅ Scan completed for ${targetUrl}`);
      setScanStatus(`Scan completed for ${targetUrl}`);
    } catch (error) {
      toast.error(`❌ Scan failed: ${error.message}`);
      setScanStatus(`Scan failed: ${error.message}`);
    }

    setLoading(false);
  };

  const stopScan = async () => {
    pollingRef.current = false;
    setLoading(false);
    setScanStatus("Scan stopped by user.");
    toast.warning("🛑 Scan stopped by user.");

    try {
      await fetch(`${BASE_URL}/ascan/action/stop/?apikey=${API_KEY}`);
      await fetch(`${BASE_URL}/spider/action/stop/?apikey=${API_KEY}`);
      await fetchAlerts();
      const msgs = await fetchSentMessages();
      setSentMessages(msgs);
    } catch (error) {
      toast.error(`❌ Failed to stop scan: ${error.message}`);
    }
  };

  const pollSpiderStatus = async (scanId) => {
    let status = "0";
    while (status !== "100" && pollingRef.current) {
      await delay(500);
      const resp = await fetch(`${BASE_URL}/spider/view/status/?scanId=${scanId}&apikey=${API_KEY}`);
      status = (await resp.json()).status;
    }
  };

  const pollScanStatus = async (scanId) => {
    let status = "0";
    while (status !== "100" && pollingRef.current) {
      await delay(1000);
      const [{ status: s }, plugins, msgs] = await Promise.all([
        fetch(`${BASE_URL}/ascan/view/status/?scanId=${scanId}&apikey=${API_KEY}`).then((r) => r.json()),
        fetchPluginProgress(),
        fetchSentMessages(),
      ]);
      status = s;
      setScanProgress(Number(status));
      setPluginProgressData(plugins);
      setSentMessages(msgs);
    }

    if (pollingRef.current) {
      setScanProgress(100);
      await fetchAlerts();
      const msgs = await fetchSentMessages();
      setSentMessages(msgs);
    }
  };

  const fetchAlerts = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/core/view/alerts/?baseurl=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`);
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
      return (json.scanners || []).map((scanner) => ({
        id: scanner.id,
        name: scanner.name,
        strength: scanner.attackStrength || "-",
        progress: parseInt(scanner.progress, 10),
        elapsed: scanner.timeStarted ? getElapsedTime(scanner.timeStarted) : "-",
        requests: scanner.requests || 0,
        alerts: scanner.alertsRaised || 0,
        status: scanner.progress >= 100 ? "✅ Done" : "⏳ Running",
      }));
    } catch {
      return [];
    }
  };

  const fetchSentMessages = async (concurrency = 20) => {
    try {
      const resp = await fetch(`${BASE_URL}/core/view/messages/?baseurl=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`);
      const data = await resp.json();
      const messages = data.messages || [];
      const limit = pLimit(concurrency);
      return Promise.all(messages.map((msg) =>
        limit(async () => {
          try {
            const r = await fetch(`${BASE_URL}/core/view/message/?id=${msg.id}&apikey=${API_KEY}`).then((x) => x.json());
            const hdr = r.message.requestHeader || "";
            const method = hdr.split(" ")[0] || "-";
            const url = hdr.split(" ")[1] || "-";
            const statusCode = r.message.responseHeader?.match(/HTTP\/\d\.\d (\d{3})/)?.[1] || "-";
            const reasonPhrase = r.message.responseHeader?.match(/HTTP\/\d\.\d \d{3} (.+)/)?.[1] || "-";
            return {
              id: msg.id,
              timeSent: r.message.timeSent,
              timeReceived: r.message.timeReceived,
              method,
              url,
              statusCode,
              reasonPhrase,
              rtt: r.message.rtt,
              responseHeader: r.message.responseHeader,
              responseBody: r.message.responseBody,
            };
          } catch (err) {
            console.error("Message fetch error:", err);
            return { id: msg.id };
          }
        })
      ));
    } catch (err) {
      console.error("Message list error:", err);
      return [];
    }
  };

  useEffect(() => {
    return () => {
      pollingRef.current = false;
    };
  }, []);

  return {
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
  };
}
