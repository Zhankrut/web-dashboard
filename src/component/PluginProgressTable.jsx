import React from "react";
import { useScan } from "../context/ScanContext";

const PluginProgressTable = () => {
  const { pluginProgressData } = useScan(); // ✅ Fix: use correct property

  if (!pluginProgressData?.length) return <p>No plugin data yet.</p>;

  return (
    <div className="overflow-y-auto max-h-96">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Plugin</th>
            <th className="py-2">Progress</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {pluginProgressData.map((plugin) => (
            <tr key={plugin.id} className="border-b">
              <td className="py-2">{plugin.name}</td>
              <td className="py-2">{plugin.progress}%</td>
              <td className="py-2">{plugin.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PluginProgressTable;
