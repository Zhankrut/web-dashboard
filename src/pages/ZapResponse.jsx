// // src/pages/ZapResponse.jsx
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const API_KEY = import.meta.env.VITE_ZAP_API_KEY;
// const BASE_URL = "/zap";

// function ZapResponse() {
//   const [responseTimes, setResponseTimes] = useState([]);

//   const fetchResponses = async () => {
//     try {
//       const resp = await fetch(`${BASE_URL}/core/view/messages/?apikey=${API_KEY}`);
//       const data = await resp.json();
//       const messages = data.messages || [];

//       const responseTimesList = await Promise.all(
//         messages.map(async (msg) => {
//           const msgResp = await fetch(`${BASE_URL}/core/view/message/?id=${msg.id}&apikey=${API_KEY}`);
//           const msgData = await msgResp.json();
//           return {
//             id: msg.id,
//             rtt: msgData.message.rtt,
//           };
//         })
//       );

//       setResponseTimes(responseTimesList);
//     } catch (error) {
//       console.error("Error fetching responses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchResponses(); // initial load
//     const interval = setInterval(fetchResponses, 2000); // refresh every 2 sec
//     return () => clearInterval(interval);
//   }, []);

//   const chartData = {
//     labels: responseTimes.map((msg) => `ID ${msg.id}`),
//     datasets: [
//       {
//         label: "Response Time (ms)",
//         data: responseTimes.map((msg) => msg.rtt || 0),
//         backgroundColor: "#3e67c8",
//       },
//     ],
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">ZAP Response Times</h2>
//       <Bar data={chartData} />
//     </div>
//   );
// }

// export default ZapResponse;
