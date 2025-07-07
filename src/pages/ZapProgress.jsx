// // src/pages/ZapProgress.jsx
// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const API_KEY = import.meta.env.VITE_ZAP_API_KEY;
// const BASE_URL = "/zap";

// function ZapProgress() {
//   const [progressData, setProgressData] = useState([]);

//   const fetchProgress = async () => {
//     try {
//       const resp = await fetch(`${BASE_URL}/ascan/view/scans/?apikey=${API_KEY}`);
//       const data = await resp.json();
//       const scans = data.scans || [];

//       const progressPoints = scans.map(scan => ({
//         id: scan.id,
//         progress: parseInt(scan.progress),
//       }));

//       setProgressData(progressPoints);
//     } catch (error) {
//       console.error("Error fetching scan progress:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProgress(); // initial load
//     const interval = setInterval(fetchProgress, 2000); // refresh every 2 sec
//     return () => clearInterval(interval);
//   }, []);

//   const chartData = {
//     labels: progressData.map((_, idx) => `Scan ${idx + 1}`),
//     datasets: [
//       {
//         label: "Scan Progress (%)",
//         data: progressData.map((point) => point.progress),
//         fill: false,
//         borderColor: "#3e67c8",
//         backgroundColor: "#3e67c8",
//       },
//     ],
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">ZAP Scan Progress</h2>
//       <Line data={chartData} />
//     </div>
//   );
// }

// export default ZapProgress;
