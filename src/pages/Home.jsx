import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import honeyBeeImage from "../assets/Images/honey.png";

/* Chart.js setup (unchanged) */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export const Home = () => {
  const navigate = useNavigate();

  /* ────────────────────────────────────
     1. STATE for real‑time figures
  ───────────────────────────────────── */
  const [zapData,    setZapData]    = useState({ lastScan: "Loading…" });
  const [honeyData,  setHoneyData]  = useState({ hits: 0 });
  const [vaultData,  setVaultData]  = useState({ count: 0 });

  /* ────────────────────────────────────
     2. FETCH everything in parallel
  ───────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        /* 🔍 ZAP */
        const zapRes = await axios.get(
          "http://localhost:8080/JSON/core/view/scans/",
          { params: { apikey: import.meta.env.VITE_ZAP_API_KEY } }
        );
        // pick latest finished scan
        const finished = zapRes.data.scans
          .filter(s => s.progress === "100")
          .sort((a, b) => b.startTime.localeCompare(a.startTime))[0];
        setZapData({
          lastScan: finished ? new Date(finished.startTime).toLocaleString() : "Never",
        });

        /* 🍯 HoneyDB */
        const honeyRes = await axios.get(
          "https://api.honeydb.io/v1/honeypot/hit_count",
          {
            params: { days: 1 },
            auth: {
              username: import.meta.env.VITE_HONEYDB_ID,
              password: import.meta.env.VITE_HONEYDB_KEY,
            },
          }
        );
        setHoneyData({ hits: honeyRes.data.count || 0 });

        /* 🔐 Vault */
        const vaultRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE}/vault/items/count`,
          { withCredentials: true }               // adapt if you use JWT/Bearer
        );
        setVaultData({ count: vaultRes.data.total || 0 });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  /* ────────────────────────────────────
     3. CHART sample data (keep static or
        build from zapData if you like)
  ───────────────────────────────────── */
  const vulnerabilityData = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{ label:"Vulnerabilities", data:[3,2,5,1,4,6,2],
                 borderColor:"#3e67c8", tension:0.3 }],
  };

  /* Feature‑navigation cards (unchanged) */
  const featureCards = [
    { title:"Vulnerability Scanner", lottie:"/animations/Data Scanning.lottie", path:"/vulnerability-scan", type:"lottie" },
    { title:"Honeypot Monitoring",   image:honeyBeeImage,                     path:"/honeypot-monitor",  type:"image" },
    { title:"Password Vault",        lottie:"/animations/Password.lottie",    path:"/password-manager",  type:"lottie" },
  ];

  /* ────────────────────────────────────
     4. RENDER
  ───────────────────────────────────── */
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3e67c8]">Security Dashboard</h1>

      {/* Feature cards */}
      <div className="flex flex-wrap gap-8 justify-center">
        {featureCards.map((c,i) => (
          <div key={i} className="group w-80 h-80 relative cursor-pointer hover:scale-105 transition" onClick={()=>navigate(c.path)}>
            <div className="absolute inset-0 rounded-2xl shadow-2xl z-10 pointer-events-none"/>
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {c.type==="lottie"
                ? <DotLottieReact src={c.lottie} loop autoplay style={{width:"100%",height:"100%"}}/>
                : <img src={c.image} alt={c.title} className="w-full h-full object-cover"/>}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <h3 className="text-sm font-semibold px-3 py-1 rounded bg-white text-[#3e67c8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                  {c.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Last Scan"       value={zapData.lastScan}/>
        <SummaryCard title="Threats Today"   value={honeyData.hits}/>
        <SummaryCard title="Vault Items"     value={vaultData.count}/>
        <SummaryCard title="Honeypot Logs"   value={honeyData.hits}/>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Weekly Vulnerability Report</h2>
        <Line data={vulnerabilityData}/>
      </div>

      {/* Activity log (you can fill with zapData or honeyData later) */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h2>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>Activity feed will be populated from real APIs…</li>
        </ul>
      </div>
    </div>
  );
};

/* Tiny helper for summary cards */
function SummaryCard({title,value}) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 text-center">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl text-[#3e67c8] font-bold mt-2">{value}</p>
    </div>
  );
}
