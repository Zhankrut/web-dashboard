import React, { useState } from "react";
import {
    fetchIpHistory,
    fetchAttacks,
    fetchBadHosts,
    fetchLookUp,
} from "../api/honeydbApi";
import {
    submitUrl,
    getUrlAnalysis,
    getIpInfo,
} from "../api/virustotalApi";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ShieldAlert, Globe, Link2 } from "lucide-react";
import IpLocationMap from "../component/Map";

const Dashboard = () => {
    const [ip, setIp] = useState("8.8.8.8");
    const [url, setUrl] = useState("https://example.com");
    const [ipData, setIpData] = useState([]);
    const [vtStats, setVtStats] = useState(null);
    const [vtIpInfo, setVtIpInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [lookup, setLookup] = useState(null);

    const handleScan = async () => {
        setLoading(true);
        setError("");
        setVtStats(null);
        setIpData([]);
        setVtIpInfo(null);

        try {
            const [ipRes, ipInfo, ipLookup] = await Promise.all([
                fetchIpHistory(ip),
                getIpInfo(ip),
                fetchLookUp(ip),
            ]);
            setIpData(ipRes);
            setVtIpInfo(ipInfo.data);
            setLookup(ipLookup);

            const vtSubmit = await submitUrl(url);
            const analysisId = vtSubmit.data.id;

            setTimeout(async () => {
                const analysis = await getUrlAnalysis(analysisId);
                setVtStats(analysis.data.attributes.stats);
                setLoading(false);
            }, 5000);
        } catch (err) {
            console.error("Error during scan:", err);
            setError("Failed to fetch data. Please check inputs or try again.");
            setLoading(false);
        }
    };
    console.log(lookup);
    const summarizeResults = (results) => {
        const counts = {};
        for (const engine in results) {
            const category = results[engine].category;
            counts[category] = (counts[category] || 0) + 1;
        }
        return counts;
    };

    return (
        <div className="p-8 bg-transparent min-h-screen text-gray-800 font-sans">
            <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
                🛡️ Cyber Threat Intelligence Dashboard
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-transparent">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        <Globe className="inline mr-1" size={18} /> IP Address (VirusTotal + HoneyDB)
                    </label>
                    <input
                        type="text"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-gray-800"
                        placeholder="e.g. 8.8.8.8"
                    />
                </div>
                <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-transparent">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        <Link2 className="inline mr-1" size={18} /> URL to Scan (VirusTotal)
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-gray-800"
                        placeholder="e.g. https://example.com"
                    />
                </div>
            </div>

            <div className="text-center mb-8">
                <button
                    onClick={handleScan}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
                >
                    {loading ? "Scanning..." : "🚀 Start Analysis"}
                </button>
            </div>

            {error && <div className="text-red-500 text-center mb-6">{error}</div>}

            <div className="grid md:grid-cols-2 gap-6">
                {vtIpInfo && (
                    <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-transparent">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center">
                            <ShieldAlert className="mr-2" /> IP Threat Intelligence
                        </h2>
                        <p className="text-sm text-gray-600 mb-1">🌍 Country: {vtIpInfo.attributes?.country}</p>
                        <p className="text-sm text-gray-600 mb-4">🏢 ASN: {vtIpInfo.attributes?.as_owner}</p>
                        <div className="text-sm space-y-1">
                            {vtIpInfo.attributes?.last_analysis_results && (
                                <>
                                    {Object.entries(summarizeResults(vtIpInfo.attributes.last_analysis_results)).map(
                                        ([category, count]) => (
                                            <div key={category} className="flex justify-between text-gray-700">
                                                <span className="capitalize">{category}</span>
                                                <span className="font-semibold">{count}</span>
                                            </div>
                                        )
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}

                {vtStats && (
                    <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-transparent">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">🔍 URL Verdict Summary</h2>
                        <ul className="space-y-2 text-sm">
                            {Object.entries(vtStats).map(([key, value]) => (
                                <li key={key} className="flex justify-between border-b border-gray-100 py-1">
                                    <span className="capitalize text-gray-600">{key}</span>
                                    <span className="text-gray-900 font-semibold">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {ipData.length > 0 && (
                <div className="border border-gray-200 mt-10 p-6 rounded-2xl shadow-sm bg-transparent">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">📊 IP (bad host) history (HoneyDB)</h3>
                    <Bar
                        data={{
                            labels: ipData.map((e) => e.date),
                            datasets: [
                                {
                                    label: "Event Count",
                                    data: ipData.map((e) => parseInt(e.event_count)),
                                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                    text: `SSH Events for ${ip}`,
                                    color: "#333",
                                    font: {
                                        size: 18,
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: "#555",
                                        maxRotation: 60,
                                        minRotation: 45,
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: "#555",
                                    },
                                },
                            },
                        }}
                    />
                </div>
            )}

            {lookup && (
                <div className="mt-10 space-y-4">
                    <h3 className="text-xl font-semibold text-blue-600">🌍 IP Location Map</h3>
                    <IpLocationMap
                        latitude={lookup.latitude}
                        longitude={lookup.longitude}
                        ip={lookup.ip}
                        as_name={lookup.as_name}
                    />
                    <h3 className="text-xl font-semibold text-blue-600">Ip info </h3>
                    {lookup && Object.entries(lookup).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b py-1 text-sm text-gray-700">
                            <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                            <span>{value !== null ? value.toString() : "N/A"}</span>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default Dashboard;
