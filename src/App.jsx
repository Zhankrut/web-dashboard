import SideBar from "./component/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useUser();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  // Show only login/signup page when not signed in
  if (!isSignedIn || isAuthPage) {
    return (
      <div className="min-h-screen">
        <Outlet />
      </div>
    );
  }

  return (
    <div
      className="flex max-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #d6f8df 0%, #ffd6e8 40%, #d6f8df 100%)",
        color: "#3e67c8",
      }}
    >
      <SideBar />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="h-full w-full overflow-y-auto pr-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
