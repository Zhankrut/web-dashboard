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
  /* ──────────────── state ──────────────── */
  const [targetUrl, setTargetUrl]         = useState("");
  const [scanProgress, setScanProgress]   = useState(0);
  const [alerts, setAlerts]               = useState([]);
  const [sentMessages, setSentMessages]   = useState([]);
  const [pluginProgressData, setPluginProgressData] = useState([]);
  const [scanStatus, setScanStatus]       = useState("");
  const [loading, setLoading]             = useState(false);
  const pollingRef = useRef(true);

  /* ──────────────── controls ──────────────── */
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
    setPluginProgressData([]);
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
      if (activeData.scan) await pollScanStatus(activeData.scan);

      toast.success(`✅ Scan completed for ${targetUrl}`);
      setScanStatus(`Scan completed for ${targetUrl}`);
    } catch (err) {
      toast.error(`❌ Scan failed: ${err.message}`);
      setScanStatus(`Scan failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
      setSentMessages(await fetchSentMessages());
    } catch (err) {
      toast.error(`❌ Failed to stop scan: ${err.message}`);
    }
  };

  /* ──────────────── polling helpers ──────────────── */
  const pollSpiderStatus = async (scanId) => {
    let status = "0";
    while (status !== "100" && pollingRef.current) {
      await delay(500);
      status = (await fetch(`${BASE_URL}/spider/view/status/?scanId=${scanId}&apikey=${API_KEY}`)
        .then(r => r.json())).status;
    }
  };

  const pollScanStatus = async (scanId) => {
    let status = "0";
    while (status !== "100" && pollingRef.current) {
      await delay(1000);

      const [{ status: s }, plugins, msgs] = await Promise.all([
        fetch(`${BASE_URL}/ascan/view/status/?scanId=${scanId}&apikey=${API_KEY}`).then(r => r.json()),
        fetchPluginProgress(scanId),
        fetchSentMessages(),
      ]);

      status && setScanProgress(Number(s));
      setPluginProgressData(plugins);
      setSentMessages(msgs);

      console.log("📊 Plugin progress:", plugins.length, "rows");
      console.log("📬 Sent messages:", msgs.length);
    }

    if (pollingRef.current) {
      setScanProgress(100);
      await fetchAlerts();
      setSentMessages(await fetchSentMessages());
    }
  };

  /* ──────────────── fetch helpers ──────────────── */
  const fetchAlerts = async () => {
    try {
      const data = await fetch(
        `${BASE_URL}/core/view/alerts/?baseurl=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`
      ).then(r => r.json());
      setAlerts(data.alerts || []);
      setScanStatus(`Found ${data.alerts?.length || 0} alerts.`);
    } catch (err) {
      setScanStatus(`Error fetching alerts: ${err.message}`);
    }
  };

  const fetchPluginProgress = async (scanId) => {
    try {
      const json = await fetch(
        `${BASE_URL}/ascan/view/scanners/?scanId=${scanId}&apikey=${API_KEY}`
      ).then(r => r.json());

      return (json.scanners || []).map(s => ({
        id: s.id,
        name: s.name,
        progress: Number(s.progress),
        strength: s.attackStrength || "-",
        elapsed: s.timeStarted ? getElapsedTime(s.timeStarted) : "-",
        requests: s.requests || 0,
        alerts: s.alertsRaised || 0,
        state: s.progress === "100" ? "Done" : "Running",
      }));
    } catch (err) {
      console.error("Plugin progress fetch error:", err);
      return [];
    }
  };

  const fetchSentMessages = async (concurrency = 8) => {
    try {
      const idsRes = await fetch(
        `${BASE_URL}/core/view/messages/?baseurl=${encodeURIComponent(targetUrl)}&apikey=${API_KEY}`
      ).then(r => r.json());

      const ids = idsRes.messages || [];
      const limit = pLimit(concurrency);

      return Promise.all(ids.map(msg =>
        limit(async () => {
          try {
            const r = await fetch(`${BASE_URL}/core/view/message/?id=${msg.id}&apikey=${API_KEY}`)
              .then(x => x.json());
            const hdr = r.message.requestHeader || "";
            const [method, url] = hdr.split(" ");
            const match = r.message.responseHeader?.match(/HTTP\/\d\.\d (\d{3}) (.+)/) || [];
            return {
              id: msg.id,
              timeSent: r.message.timeSent,
              rtt: r.message.rtt,
              method,
              url,
              statusCode: match[1] || "-",
              reasonPhrase: match[2] || "-",
            };
          } catch { return { id: msg.id }; }
        })
      ));
    } catch (err) {
      console.error("Message list error:", err);
      return [];
    }
  };

  /* ──────────────── cleanup ──────────────── */
  useEffect(() => () => { pollingRef.current = false; }, []);

  /* ──────────────── public api ──────────────── */
  return {
    targetUrl, setTargetUrl,
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
