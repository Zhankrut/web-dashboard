import React from "react";
import { Line } from "react-chartjs-2";
import { useScan } from "../context/ScanContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const ResponseTimeChart = () => {
  const { sentMessages } = useScan();

  if (!sentMessages?.length) return <p className="text-sm">No response time data available.</p>;

  const sorted = [...sentMessages].sort(
    (a, b) => new Date(a.timeSent) - new Date(b.timeSent)
  );

  const data = {
    labels: sorted.map((msg) => new Date(msg.timeSent)),
    datasets: [
      {
        label: "Response Time (ms)",
        data: sorted.map((msg) => msg.rtt),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "HH:mm:ss",
          unit: "second",
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "Time Sent",
        },
      },
      y: {
        title: {
          display: true,
          text: "RTT (ms)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">📈 Response Time Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ResponseTimeChart;
