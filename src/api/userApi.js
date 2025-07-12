import axios from "axios";

// Axios instance for user API
const API = axios.create({
    baseURL: "http://localhost:8000/api/v1/users",
    withCredentials: true, // send cookies with every request
});

// =======================
// User API Functions
// =======================

export const registerUser = async (formData) => {
    return await API.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const loginUser = async (credentials) => {
    return await API.post("/login", credentials);
};

export const logoutUser = async () => {
    return await API.post("/logout");
};

export const refreshAccessToken = async () => {
    return await API.post("/refresh-token");
};

export const getCurrentUser = async () => {
    return await API.get("/current-user");
};

export const changePassword = async (data) => {
    return await API.post("/change-password", data);
};

export const updateAccountDetails = async (data) => {
    return await API.patch("/update-account", data);
};

export const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return await API.patch("/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateCoverImage = async (file) => {
    const formData = new FormData();
    formData.append("coverImage", file);
    return await API.patch("/cover-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
