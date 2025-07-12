// src/api/honeydbApi.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchAttacks = async () => {
    const res = await axios.get(`${API_BASE}/services`);
    return res.data;
};

export const fetchBadHosts = async () => {
    const res = await axios.get(`${API_BASE}/badHost`);
    return res.data;
};

export const fetchIpHistory = async (ip) => {
    const res = await axios.get(`${API_BASE}/ip-history/${ip}`);
    return res.data;
};
