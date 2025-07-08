import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const mockLoginHistory = [
  {
    time: "2025-07-08 14:22",
    ip: "192.168.1.101",
    location: "New York, USA",
    device: "Chrome on Windows",
  },
  {
    time: "2025-07-07 09:14",
    ip: "103.25.56.77",
    location: "Berlin, Germany",
    device: "Safari on iPhone",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const [user, setUser] = useState(auth?.email ? JSON.parse(localStorage.getItem(`user:${auth.email}`)) : null);
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on Windows", location: "USA", active: true },
    { id: 2, device: "Safari on iPhone", location: "Germany", active: true },
  ]);
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", password: user?.password || "" });

  useEffect(() => {
    if (!auth) navigate("/login");
  }, [auth, navigate]);

  const revokeSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const getInitials = (name) => name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "?";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveChanges = () => {
    const updatedUser = { ...user, ...form, avatar };
    localStorage.setItem(`user:${auth.email}`, JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getPasswordStrength = (password) => {
    if (!password) return "Weak";
    if (password.length > 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return "Strong";
    if (password.length >= 6) return "Medium";
    return "Weak";
  };

  const downloadData = () => {
    const blob = new Blob([JSON.stringify(user, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile-data.json";
    a.click();
  };

  return (
    <div className="min-h-screen p-6 ">
      <div
        className="mt-6 border border-gray-200 shadow-lg rounded-xl p-6 max-w-4xl mx-auto"
        style={{
          background: "linear-gradient(to bottom, #d6f8df 0%, #ffd6e8 40%, #d6f8df 100%)",
          color: "#3e67c8",
        }}
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-300 pb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              getInitials(user?.name)
            )}
            <input type="file" ref={fileRef} hidden onChange={handleImageUpload} />
            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-0 right-0 bg-white text-xs text-black px-2 py-0.5 rounded-full shadow"
            >
              Edit
            </button>
          </div>
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border rounded"
                  placeholder="Name"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border rounded"
                  placeholder="Email"
                />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  className="block w-full px-3 py-2 border rounded"
                  placeholder="Password"
                />
                <p>Password strength: {getPasswordStrength(form.password)}</p>
                <div className="flex gap-2">
                  <button onClick={saveChanges} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
                  <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Password:</strong> ••••••••</p>
                <button onClick={() => setIsEditing(true)} className="text-sm text-blue-700 underline">Edit</button>
              </>
            )}
          </div>
        </div>

        {/* Security Info */}
        <div className="pt-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Account Security</h2>
            <p><strong>2FA Enabled:</strong> {auth?.is2FAEnabled ? "Yes" : "No"}</p>
            <p><strong>Password Last Changed:</strong> {auth?.passwordChanged || "Unknown"}</p>
            <p><strong>Created:</strong> {user?.createdAt || "N/A"}</p>
            <p><strong>Last Updated:</strong> {user?.updatedAt || "N/A"}</p>
          </div>

          {/* Login History */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Recent Login Activity</h2>
            <ul className="space-y-2 text-sm">
              {mockLoginHistory.map((entry, i) => (
                <li key={i}><strong>{entry.time}</strong> — {entry.device} @ {entry.location} ({entry.ip})</li>
              ))}
            </ul>
          </div>

          {/* Sessions */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Active Sessions</h2>
            <ul className="space-y-2">
              {sessions.map((s) => (
                <li key={s.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                  <span>{s.device} — {s.location}</span>
                  <button
                    onClick={() => revokeSession(s.id)}
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                  >
                    Revoke
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Device Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Device Info</h2>
            <p><strong>User Agent:</strong> {navigator.userAgent}</p>
            <p><strong>Platform:</strong> {navigator.platform}</p>
          </div>

          {/* Alert */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 text-sm rounded text-yellow-800">
            <strong>Reminder:</strong> If you notice unusual activity, change your password and enable 2FA.
          </div>

          {/* Download Data */}
          <div>
            <button onClick={downloadData} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Download My Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;