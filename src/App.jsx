import SideBar from "./component/SideBar";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) {
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
        background: "linear-gradient( #fce7f3 0%, #e0f2fe 50%, #e0f2fe 100%)",
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