import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Submit a URL to VirusTotal for scanning
export const submitUrl = async (url) => {
    try {
        const res = await axios.post(`${API_BASE}/submit-url`, { url });
        return res.data;
    } catch (error) {
        console.error('Frontend submitUrl error:', error.response?.data || error.message);
        throw error;
    }
};

// Get analysis result for a URL submission
export const getUrlAnalysis = async (id) => {
    try {
        const res = await axios.get(`${API_BASE}/url-analysis/${id}`);
        return res.data;
    } catch (error) {
        console.error('Frontend getUrlAnalysis error:', error.response?.data || error.message);
        throw error;
    }
};

// ✅ NEW: Get info for an IP address from VirusTotal
export const getIpInfo = async (ip) => {
    try {
        const res = await axios.get(`${API_BASE}/ip-info/${ip}`);
        return res.data;
    } catch (error) {
        console.error('Frontend getIpInfo error:', error.response?.data || error.message);
        throw error;
    }
};
