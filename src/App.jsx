import SideBar from "./component/SideBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
<<<<<<< HEAD
    <div className='flex box-border bg-gray-800' >
      <SideBar />
      <div className='w-full mx-20 my-4'>
        {<Outlet />}
=======
    <div
      className="flex min-h-screen"
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
>>>>>>> dd7f776a1725058d6e4c658b943d7543a5af8a3f
      </div>
    </div>
  );
}

export default App;
