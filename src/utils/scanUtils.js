// src/utils/scanUtils.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// 🎨 Risk badge styles
export function getRiskStyles(risk) {
  switch (risk) {
    case "Critical":
      return {
        backgroundColor: "#e9a8f7",
        boxShadow: "0 4px 15px rgba(172, 168, 247, 0.57)",
      };
    case "High":
      return {
        backgroundColor: "#ff6b6b",
        boxShadow: "0 4px 15px rgba(255, 107, 107, 0.7)",
      };
    case "Medium":
      return {
        backgroundColor: "#ffb347",
        boxShadow: "0 4px 15px rgba(255, 179, 71, 0.7)",
      };
    case "Low":
      return {
        backgroundColor: "#ffe66d",
        boxShadow: "0 4px 15px rgba(255, 230, 109, 0.7)",
      };
    case "Informational":
      return {
        backgroundColor: "#cce5ff",
        boxShadow: "0 4px 15px rgba(204, 229, 255, 0.7)",
      };
    default:
      return {
        backgroundColor: "#d1d5db",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      };
  }
}

// 📊 Group HTTP responses by time and status class
export function groupResponsesByTime(messages) {
  const grouped = {};
  messages.forEach(({ timeReceived, statusCode }) => {
    if (!timeReceived || !statusCode) return;
    const second = new Date(timeReceived).toISOString().slice(0, 19); // yyyy-MM-ddTHH:mm:ss
    const codeClass = `${statusCode}`.charAt(0) + "xx";
    if (!grouped[second]) grouped[second] = {};
    grouped[second][codeClass] = (grouped[second][codeClass] || 0) + 1;
  });
  return grouped;
}

// 📝 Generate styled vulnerability report PDF
export function generateStyledPDF(alerts) {
  const doc = new jsPDF();
  doc.setFontSize(18);

  const riskSummary = { Critical: 0, High: 0, Medium: 0, Low: 0, Accepted: 0 };

  alerts.forEach((alert) => {
    if (riskSummary[alert.risk] !== undefined) {
      riskSummary[alert.risk]++;
    }
  });

  const total = Object.values(riskSummary).reduce((a, b) => a + b, 0);
  const getPercent = (count) => (total ? Math.round((count / total) * 100) : 0);

  doc.text("Total Vulnerabilities", 14, 20);
  doc.setFontSize(10).text("Below are the total number of vulnerabilities found by severity.", 14, 26);

  const levels = ["Critical", "High", "Medium", "Low", "Accepted"];
  levels.forEach((level, i) => {
    const color = level === "Critical"
      ? "#e9a8f7"
      : level === "High"
      ? "#ff6b6b"
      : level === "Medium"
      ? "#ffb347"
      : level === "Low"
      ? "#ffe66d"
      : "#cce5ff";

    doc.setFillColor(color);
    doc.rect(14 + i * 35, 32, 30, 20, "F");
    doc.setTextColor(0).setFontSize(12).text(`${riskSummary[level]}`, 29 + i * 35, 45, { align: "center" });
    doc.setFontSize(8).text(level, 29 + i * 35, 51, { align: "center" });
  });

  // 📊 Draw percentage bar (optional visual element)
  const mediumPercent = getPercent(riskSummary.Medium);
  const lowPercent = getPercent(riskSummary.Low);
  doc.setFillColor("#ffb347").rect(14, 58, (mediumPercent / 100) * 180, 8, "F");
  doc.setFillColor("#ffe66d").rect(14 + (mediumPercent / 100) * 180, 58, (lowPercent / 100) * 180, 8, "F");
  doc.setTextColor(0).setFontSize(8);
  doc.text(`${mediumPercent}%`, 14 + (mediumPercent / 2) * 1.8, 66, { align: "center" });
  doc.text(`${lowPercent}%`, 14 + (mediumPercent + lowPercent / 2) * 1.8, 66, { align: "center" });

  doc.addPage();
  doc.setFontSize(16).text("Vulnerabilities Breakdown", 14, 20);

  autoTable(doc, {
    startY: 28,
    head: [["Title", "Severity", "Open", "Accepted"]],
    body: alerts.map((alert) => [
      alert.alert || "-",
      alert.risk || "-",
      "1",
      "0",
    ]),
    styles: { fontSize: 9 },
  });

  doc.save(`scan-report-${Date.now()}.pdf`);
}
