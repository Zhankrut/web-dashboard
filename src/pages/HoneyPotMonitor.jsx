import React, { useEffect, useState } from 'react';

const HoneyDashboard = () => {
    const [attacks, setAttacks] = useState([]);
    const [badHost, setBadHost] = useState([]);
    const [ setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/attacks')
            .then((res) => res.json())
            .then((data) => { console.log(data); setAttacks(data) })
            .catch((err) => setError('Could not load HoneyDB data' + err.message));

        fetch('http://localhost:5000/api/badHost')
            .then((res) => res.json())
            .then((data) => { console.log(data); setBadHost(data) })
            .catch((err) => setError('Could not load HoneyDB data' + err.message));
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Service provide by HoneyDB</h2>
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Remote Host</th>
                            <th className="py-2 px-4 border-b text-left">Request Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attacks.map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{entry.service}</td>
                                <td className="py-2 px-4 border-b">{Number(entry.count).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center">bad hosts by HoneyDB</h2>
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Remote Host</th>
                            <th className="py-2 px-4 border-b text-left">Request Count</th>
                            <th className="py-2 px-4 border-b text-left">Last Seen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {badHost.slice(0, 20).map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{entry.remote_host}</td>
                                <td className="py-2 px-4 border-b">{Number(entry.count).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b">{entry.last_seen}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HoneyDashboard;
