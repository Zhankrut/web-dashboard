import SideBar from "./component/SideBar";
import { Outlet } from "react-router-dom";

// Load environment variables from .env file

function App() {
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

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="h-full w-full overflow-y-auto pr-2 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
