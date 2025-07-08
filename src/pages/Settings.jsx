import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      {auth && (
        <p className="text-gray-700 mb-2">
          Logged in as: <strong>{auth.email}</strong>
        </p>
      )}
      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Settings;
