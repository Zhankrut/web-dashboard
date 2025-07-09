import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (!storedAuth) {
      navigate("/login");
    } else {
      setAuth(storedAuth);
      const userData = JSON.parse(localStorage.getItem(`user:${storedAuth.email}`));
      setUser(userData);
      setIs2FAEnabled(storedAuth.is2FAEnabled || false);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handle2FAToggle = () => {
    const updatedAuth = { ...auth, is2FAEnabled: !is2FAEnabled };
    localStorage.setItem("auth", JSON.stringify(updatedAuth));
    setIs2FAEnabled(!is2FAEnabled);
    setAuth(updatedAuth); // also update the state
  };

  const handleLogoutAll = () => {
    localStorage.removeItem("auth");
    alert("All sessions logged out. Please log in again.");
    navigate("/login");
  };

  const handleDownloadData = () => {
    if (!user) return;
    const blob = new Blob([JSON.stringify(user, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-data.json";
    a.click();
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem(`user:${auth.email}`);
      localStorage.removeItem("auth");
      navigate("/signup");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {auth && (
        <div className="space-y-4 text-gray-800">
          <div>
            <p>
              Logged in as: <strong>{auth.email}</strong>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication (2FA):</span>
            <button
              onClick={handle2FAToggle}
              className={`px-4 py-1 rounded ${
                is2FAEnabled ? "bg-green-500" : "bg-gray-400"
              } text-white`}
            >
              {is2FAEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          <div>
            <button
              onClick={handleDownloadData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download My Data
            </button>
          </div>

          <div>
            <button
              onClick={handleLogoutAll}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Log Out All Devices
            </button>
          </div>

          <div>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>

          <div>
            <button
              onClick={handleSignOut}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
