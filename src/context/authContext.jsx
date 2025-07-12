import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../api/userApi";

const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial auth check

  // Load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.log("User not logged in");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const refresh = async () => {
    try {
      const res = await refreshAccessToken();
      console.log("Access token refreshed");
      return res.data.accessToken;
    } catch (err) {
      console.error("Refresh token failed", err);
      logout(); // Optionally auto-logout
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refresh, loading }}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};
