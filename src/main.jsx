// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScanProvider } from "./context/ScanContext"; // ✅ Import the context provider
import { Home } from "./pages/Home.jsx";
import PasswordManager from "./pages/PasswordManager.jsx";
import VulnerabilityScan from "./pages/VulnerabilityScan.jsx";
import HoneyPotMonitor from "./pages/HoneyPotMonitor.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import AuthPage from "./component/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "vulnerability-scan", element: <VulnerabilityScan /> },
      { path: "password-manager", element: <PasswordManager /> },
      { path: "honeypot-monitor", element: <HoneyPotMonitor /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
      { path: "login", element: <AuthPage /> },
      { path: "signup", element: <AuthPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScanProvider>
      <RouterProvider router={router} />
    </ScanProvider>
  </StrictMode>
);
